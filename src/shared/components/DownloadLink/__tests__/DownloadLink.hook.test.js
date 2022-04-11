import { createContext } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { SERVICE_NAME, SUBMIT_DOWNLOAD_ID_FAILURE, SUBMIT_DOWNLOAD_ID_SUCCESS, SUCCESS_DOWNLOAD_MESSAGE } from '../constants';
import {
  useDownload,
  useSubmitDownload,
  setDownloadFile,
  INITIAL_STATE,
  useNotifyDownloadError,
  useNotifyDownloadSuccess,
} from '../DownloadLink.hook';

describe('useSubmitDownload', () => {
  it('Should stateSubmitDownload to be false when clearSubmitDownload called', () => {
    const { result } = renderHook(() => useSubmitDownload());
    act(() => result.current.clearSubmitDownload());
    expect(result.current.stateSubmitDownload).toBe(false);
  });

  it('Should stateSubmitDownload to be true when submitDownload called', () => {
    const { result } = renderHook(() => useSubmitDownload());
    act(() => result.current.submitDownload());
    expect(result.current.stateSubmitDownload).toBe(true);
  });
});

describe('setDownloadFile', () => {
  const downloadjsFnMock = jest.fn();

  it('Should not call downloadjsFn When state.downloadFile is null', () => {
    setDownloadFile({
      fileName: 'test.csv',
      state: {
        downloadFile: null,
      },
      downloadjsFn: downloadjsFnMock,
    });

    expect(downloadjsFnMock).not.toBeCalled();
  });

  it('Should call downloadjsFn When state.downloadFile is NOT null', () => {
    setDownloadFile({
      fileName: 'test.csv',
      state: {
        downloadFile: 'file',
      },
      downloadjsFn: downloadjsFnMock,
    });

    expect(downloadjsFnMock).toBeCalledWith('file', 'test.csv', 'text/csv');
  });
});

describe('useDownload', () => {
  const defaultProps = {
    path: 'elections/12/resultats',
    hasSubmit: false,
  };
  it('Should return initial state when useDownload called with path: "elections/12/resultats" and hasSubmit: false', () => {
    const { result } = renderHook(() => useDownload({ ...defaultProps }));
    const expectedState = INITIAL_STATE;
    act(() => {
      expect(result.current.state).toEqual(expectedState);
    });
  });

  it('Should useFetchDataMock called  when useDownload called with path: "elections/12/resultats" and hasSubmit: true', () => {
    const useFetchDataMock = jest.fn();
    const getApiMock = jest.fn();

    renderHook(() =>
      useDownload({
        ...defaultProps,
        hasSubmit: true,
        useFetchDataFn: useFetchDataMock,
        getApiFn: getApiMock.mockReturnValue('downloadfileServiceResponse'),
      }),
    );

    act(() => {
      expect(useFetchDataMock).toBeCalledWith({
        condition: true,
        initialState: INITIAL_STATE,
        serviceName: SERVICE_NAME,
        service: 'downloadfileServiceResponse',
      });
      expect(getApiMock).toBeCalledWith('elections/12/resultats', { blob: true });
    });
  });
});

describe('useNotifyDownloadError', () => {
  const clearStateMock = jest.fn();
  const clearSubmitDownloadMock = jest.fn();
  const fetchNotifyErrorFnMock = jest.fn();
  const addNotificationMock = jest.fn();
  const NotificationContextObjMock = createContext({
    addNotification: addNotificationMock,
  });

  const defaultProps = {
    path: 'elections/12/resultats',
    clearState: clearStateMock,
    state: INITIAL_STATE,
    hasSubmit: false,
    clearSubmitDownload: clearSubmitDownloadMock,
    NotificationContextObj: NotificationContextObjMock,
    fetchNotifyErrorFn: fetchNotifyErrorFnMock,
  };

  it('Should not call notify action functions when condition are not ok', () => {
    renderHook(() => useNotifyDownloadError(defaultProps));
    expect(clearStateMock).not.toBeCalled();
    expect(clearSubmitDownloadMock).not.toBeCalled();
    expect(fetchNotifyErrorFnMock).not.toBeCalled();
  });

  it('Should call action functions when condition are ok', () => {
    renderHook(() =>
      useNotifyDownloadError({
        ...defaultProps,
        state: { ...INITIAL_STATE, anomaly: { [SERVICE_NAME]: 'error' } },
        hasSubmit: true,
      }),
    );

    expect(clearStateMock).toBeCalled();
    expect(clearSubmitDownloadMock).toBeCalled();
    expect(fetchNotifyErrorFnMock).toBeCalledWith({
      state: { ...INITIAL_STATE, anomaly: { [SERVICE_NAME]: 'error' } },
      addNotification: addNotificationMock,
      serviceName: SERVICE_NAME,
      idNotifyAnomaly: `${SUBMIT_DOWNLOAD_ID_FAILURE}-elections/12/resultats`,
    });
  });
});

describe('useNotifyDownloadSuccess', () => {
  const clearStateMock = jest.fn();
  const clearSubmitDownloadMock = jest.fn();
  const fetchNotifySuccessFnMock = jest.fn();
  const addNotificationMock = jest.fn();
  const NotificationContextObjMock = createContext({
    addNotification: addNotificationMock,
  });

  const defaultProps = {
    path: 'elections/12/resultats',
    clearState: clearStateMock,
    state: INITIAL_STATE,
    hasSubmit: false,
    clearSubmitDownload: clearSubmitDownloadMock,
    NotificationContextObj: NotificationContextObjMock,
    fetchNotifySuccessFn: fetchNotifySuccessFnMock,
  };

  it('Should not call notify action functions when condition are not ok', () => {
    renderHook(() => useNotifyDownloadSuccess(defaultProps));
    expect(clearStateMock).not.toBeCalled();
    expect(clearSubmitDownloadMock).not.toBeCalled();
    expect(fetchNotifySuccessFnMock).not.toBeCalled();
  });

  it('Should call action functions when condition are ok', () => {
    renderHook(() =>
      useNotifyDownloadSuccess({
        ...defaultProps,
        state: { ...INITIAL_STATE, [SERVICE_NAME]: 'success' },
        hasSubmit: true,
      }),
    );

    expect(clearStateMock).toBeCalled();
    expect(clearSubmitDownloadMock).toBeCalled();
    expect(fetchNotifySuccessFnMock).toBeCalledWith({
      state: { ...INITIAL_STATE, [SERVICE_NAME]: 'success', label: SUCCESS_DOWNLOAD_MESSAGE },
      addNotification: addNotificationMock,
      serviceName: SERVICE_NAME,
      idNotifySuccess: `${SUBMIT_DOWNLOAD_ID_SUCCESS}-elections/12/resultats`,
    });
  });
});
