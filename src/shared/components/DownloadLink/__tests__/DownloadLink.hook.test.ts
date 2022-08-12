import { createContext } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { TNotificationContext } from 'App/NotificationProvider/NotificationProvider';
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
  const state = {
    downloadFile: [],
    isLoading: false,
    isLoaded: false,
    anomaly: {
      downloadFile: null,
    },
  };

  it('Should not call downloadjsFn When state.downloadFile is empty', () => {
    setDownloadFile({
      fileName: 'test.csv',
      state,
      hasSubmit: false,
      downloadjsFn: downloadjsFnMock,
    });

    expect(downloadjsFnMock).not.toBeCalled();
  });

  it('Should call downloadjsFn When state.downloadFile is NOT empty', () => {
    const blob = new Blob([''], { type: 'text/csv' });
    setDownloadFile({
      fileName: 'test.csv',
      state: {
        ...state,
        downloadFile: blob,
      },
      hasSubmit: true,
      downloadjsFn: downloadjsFnMock,
    });

    expect(downloadjsFnMock).toBeCalledWith(blob, 'test.csv', 'text/csv');
  });
});

describe('useDownload', () => {
  const defaultProps = {
    path: 'elections/12/resultats',
    hasSubmit: false,
    clearSubmitDownload: jest.fn(),
    useQueryFn: jest.fn().mockReturnValue({
      data: undefined,
      isFetching: false,
      isFetched: false,
    }),
  };
  it('Should return initial state when useDownload called with path: "elections/12/resultats" and hasSubmit: false', () => {
    const { result } = renderHook(() => useDownload({ ...defaultProps }));
    const expectedState = INITIAL_STATE;
    act(() => {
      expect(result.current.state).toEqual(expectedState);
    });
  });
});

describe('useNotifyDownloadError', () => {
  const fetchNotifyErrorFnMock = jest.fn();
  const addNotificationMock = jest.fn();
  const NotificationContext = createContext<TNotificationContext>({ addNotification: addNotificationMock });

  const defaultProps = {
    path: 'elections/12/resultats',
    state: INITIAL_STATE,
    hasSubmit: false,
    NotificationContextObj: NotificationContext,
    fetchNotifyErrorFn: fetchNotifyErrorFnMock,
  };

  it('Should not call notify action functions when condition are not ok', () => {
    renderHook(() => useNotifyDownloadError(defaultProps));
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

    expect(fetchNotifyErrorFnMock).toBeCalledWith({
      state: { ...INITIAL_STATE, anomaly: { [SERVICE_NAME]: 'error' } },
      addNotification: addNotificationMock,
      serviceName: SERVICE_NAME,
      idNotifyAnomaly: `${SUBMIT_DOWNLOAD_ID_FAILURE}-elections/12/resultats`,
    });
  });
});

describe('useNotifyDownloadSuccess', () => {
  const fetchNotifySuccessFnMock = jest.fn();
  const addNotificationMock = jest.fn();
  const NotificationContext = createContext<TNotificationContext>({ addNotification: addNotificationMock });

  const defaultProps = {
    path: 'elections/12/resultats',
    state: INITIAL_STATE,
    hasSubmit: false,
    NotificationContextObj: NotificationContext,
    fetchNotifySuccessFn: fetchNotifySuccessFnMock,
  };

  it('Should not call notify action functions when condition are not ok', () => {
    renderHook(() => useNotifyDownloadSuccess(defaultProps));
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

    expect(fetchNotifySuccessFnMock).toBeCalledWith({
      state: { ...INITIAL_STATE, [SERVICE_NAME]: 'success', label: SUCCESS_DOWNLOAD_MESSAGE },
      addNotification: addNotificationMock,
      idNotifySuccess: `${SUBMIT_DOWNLOAD_ID_SUCCESS}-elections/12/resultats`,
    });
  });
});
