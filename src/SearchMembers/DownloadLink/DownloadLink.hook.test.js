import { createContext } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  downloadReducer,
  setStateDownloadLoading,
  setStateDownloadSuccess,
  setStateDownloadFailure,
  setDownloadLoading,
  setDownloadError,
  setDownloadSuccess,
  useDownload,
  setDownloadFile,
  setDownloadInit,
  notifyDownloadError,
  notifyDownloadSuccess,
  setOnSubmitDownload,
  setFileName,
} from './DownloadLink.hook';
import { FETCH_DOWNLOAD } from './constants';

describe('setFileName', () => {
  it('Should return AxaMutuelle___20180922.csv with When setFileName with date (2018, 8, 22)', () => {
    const result = setFileName({ date: new Date(2018, 8, 22) });
    const expected = 'AxaMutuelle___20180922.csv';
    expect(result).toEqual(expected);
  });
  it('Should return AxaMutuelle___20180922.csv with When setFileName with date (2018, 8, 22)', () => {
    const result = setFileName({ name: 'name', distributorId: '0123456789', date: new Date(2018, 8, 22) });
    const expected = 'AxaMutuelle_name_0123456789_20180922.csv';
    expect(result).toEqual(expected);
  });
  it('Should return AxaMutuelle___20180922.csv with When formatDateFn return 20180922', () => {
    const formatDateFnMock = jest.fn().mockReturnValue('20180922');
    const result = setFileName({ name: 'name', distributorId: '0123456789', formatDateFn: formatDateFnMock });
    const expected = 'AxaMutuelle_name_0123456789_20180922.csv';
    expect(result).toEqual(expected);
  });
});

describe('downloadReducer', () => {
  const state = {
    value: 'value',
  };

  it('Should return inital state when type = FETCH_DOWNLOAD_INIT', () => {
    const result = downloadReducer(state, { type: FETCH_DOWNLOAD.INIT });
    const expected = {
      isLoading: false,
      downloadFile: null,
      anomaly: {
        downloadFile: null,
      },
    };
    expect(result).toEqual(expected);
  });

  it('Should return state with isLoading true and is Error false when type = FETCH_DOWNLOAD_LOADING', () => {
    const result = downloadReducer(state, { type: FETCH_DOWNLOAD.LOADING });
    const expected = {
      value: 'value',
      isLoading: true,
    };
    expect(result).toEqual(expected);
  });

  it('Should return state with isLoading false and is Error true when type = FETCH_DOWNLOAD_FAILURE', () => {
    const result = downloadReducer(state, { type: FETCH_DOWNLOAD.FAILURE, payload: { downloadFile: 'error' } });
    const expected = {
      value: 'value',
      isLoading: false,
      anomaly: {
        downloadFile: 'error',
      },
    };
    expect(result).toEqual(expected);
  });

  it('Should return state with isLoading false and is Error false when type = FETCH_DOWNLOAD_SUCCESS', () => {
    const payload = {
      downloadFile: {
        responseBody: 'content file',
        statusHttp: 200,
      },
    };
    const result = downloadReducer(state, { type: FETCH_DOWNLOAD.SUCCESS, payload });
    const expected = {
      value: 'value',
      isLoading: false,
      code: 200,
      downloadFile: 'content file',
      label: 'Succès: Le fichier est téléchargé',
    };
    expect(result).toEqual(expected);
  });

  it('Should return throw error when type = other', () => {
    const result = downloadReducer(state, { type: 'other' });
    expect(result).toEqual({
      value: 'value',
    });
  });
});

describe('setStateDownloadLoading', () => {
  it('Should return state isLoading: true with When setStateDownloadLoading called with state', () => {
    const state = { value: '01' };
    const result = setStateDownloadLoading({ state });
    const expected = {
      value: '01',
      isLoading: true,
    };
    expect(result).toEqual(expected);
  });
});

describe('setStateDownloadFailure', () => {
  it('Should return state isLoading: false with anomalies When setStateDownloadFailure called with state and payload', () => {
    const state = { value: '01' };
    const payload = { downloadFile: { code: 500 } };
    const result = setStateDownloadFailure({ state, payload });
    const expected = {
      value: '01',
      isLoading: false,
      anomaly: { downloadFile: { code: 500 } },
    };
    expect(result).toEqual(expected);
  });
});

describe('setStateDownloadSuccess', () => {
  it('Should return state with downloadFile When setStateDownloadSuccess called with state and payload contain transformation and downloadFile', () => {
    const state = { value: '01' };
    const payload = {
      downloadFile: {
        responseBody: 'content file',
        statusHttp: 200,
      },
    };
    const result = setStateDownloadSuccess({ state, payload });
    const expected = {
      value: '01',
      isLoading: false,
      code: 200,
      downloadFile: 'content file',
      label: 'Succès: Le fichier est téléchargé',
    };

    expect(result).toEqual(expected);
  });
});

describe('setDownloadInit', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_DOWNLOAD_INIT" } When called', () => {
    setDownloadInit(dispatchMock)();
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_DOWNLOAD_INIT' });
  });
});

describe('setDownloadLoading', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_DOWNLOAD_LOADING" } When called', () => {
    setDownloadLoading(dispatchMock)();
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_DOWNLOAD_LOADING' });
  });
});

describe('setDownloadError', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_DOWNLOAD_FAILURE" } When called with error', () => {
    setDownloadError(dispatchMock)('error');
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_DOWNLOAD_FAILURE', payload: 'error' });
  });
});

describe('setDownloadSuccess', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_DOWNLOAD_SUCCESS" } When called with response', () => {
    setDownloadSuccess(dispatchMock)('response');
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_DOWNLOAD_SUCCESS', payload: 'response' });
  });
});

describe('useDownload', () => {
  const NotificationContext = createContext({ addNotification: jest.fn() });
  const defaultParams = {
    distributorId: 'distributorId',
    NotificationContextObj: NotificationContext,
  };

  it('Should state to be initialize when initStateDownload called', () => {
    const { result } = renderHook(() => useDownload(defaultParams));
    act(() => result.current.initStateDownload());
    const res = result.current.stateDownload;
    expect(res).toEqual({
      isLoading: false,
      downloadFile: null,
      anomaly: {
        downloadFile: null,
      },
    });
  });
  it('Should call setOnSubmitDownloadFn when onDownload called', () => {
    const setOnSubmitDownloadMock = jest.fn();
    const { result } = renderHook(() => useDownload({ ...defaultParams, setOnSubmitDownloadFn: setOnSubmitDownloadMock }));
    act(() => result.current.onDownload());
    expect(setOnSubmitDownloadMock).toBeCalled();
  });
  it('Should call abortMock called after 20000ms when onDownload called with abortController', () => {
    const setOnSubmitDownloadMock = jest.fn();
    const abortMock = jest.fn();

    jest.useFakeTimers();
    const { result } = renderHook(() => useDownload({ ...defaultParams, setOnSubmitDownloadFn: setOnSubmitDownloadMock }));
    act(() =>
      result.current.onDownload(null, {
        abort: abortMock,
        signal: {},
      }),
    );

    act(() => jest.advanceTimersByTime(21000));
    expect(abortMock).toBeCalled();
  });
});

describe('setDownloadFile', () => {
  const downloadjsFnMock = jest.fn();

  it('Should not call downloadjsFn When stateDownload.downloadFile is null', () => {
    setDownloadFile({
      distributorId: 'distributorId',
      stateDownload: {
        downloadFile: null,
      },
      downloadjsFn: downloadjsFnMock,
    });

    expect(downloadjsFnMock).not.toBeCalled();
  });

  it('Should call downloadjsFn When stateDownload.downloadFile is NOT null', () => {
    const setFileNameFnMock = jest.fn().mockReturnValue('AxaMutuelle__distributorId_20210216.csv');
    setDownloadFile({
      distributorId: 'distributorId',
      stateDownload: {
        downloadFile: 'file',
      },
      downloadjsFn: downloadjsFnMock,
      setFileNameFn: setFileNameFnMock,
    });

    expect(downloadjsFnMock).toBeCalledWith('file', 'AxaMutuelle__distributorId_20210216.csv', 'text/csv');
  });
});

describe('notifyDownloadError', () => {
  const addNotificationMock = jest.fn();
  const initStateDownloadMock = jest.fn();
  it('Should addNotificationMock to be called with error info When called notifyDownloadError stateDownload.anomaly.downloadFile.code startswith "50" or "40"', () => {
    notifyDownloadError({
      addNotification: addNotificationMock,
      initStateDownload: initStateDownloadMock,
      stateDownload: {
        anomaly: {
          downloadFile: {
            code: '500',
            label: 'error',
            detail: 'detail error',
          },
        },
      },
      distributorId: 'distributorId',
    });

    expect(addNotificationMock).toBeCalledWith({
      code: '500',
      detail: 'detail error',
      label: 'error',
      id: 'errorsubmitdownload-distributorId',
    });
    expect(initStateDownloadMock).toBeCalled();
  });

  it('Should addNotificationMock NOT to be called When called notifyDownloadError and stateDownload.anomaly.downloadFile.code not exist', () => {
    notifyDownloadError({
      addNotification: addNotificationMock,
      initStateDownload: initStateDownloadMock,
      stateDownload: {
        anomaly: {
          downloadFile: {},
        },
      },
    });
    expect(addNotificationMock).not.toBeCalled();
    expect(initStateDownloadMock).not.toBeCalled();
  });
});

describe('notifyDownloadSuccess', () => {
  const addNotificationMock = jest.fn();
  const initStateDownloadMock = jest.fn();
  it('Should addNotificationMock to be called with success info When called notifyDownloadSuccess stateDownload.downloadFile.code equal "200"', () => {
    notifyDownloadSuccess({
      addNotification: addNotificationMock,
      initStateDownload: initStateDownloadMock,
      stateDownload: {
        code: 200,
        label: 'success label',
        detail: 'detail success',
      },
      distributorId: 'distributorId',
    });

    expect(addNotificationMock).toBeCalledWith({
      code: 200,
      detail: 'detail success',
      label: 'success label',
      type: 'success',
      id: 'successsubmitdownload-distributorId',
    });
    expect(initStateDownloadMock).toBeCalled();
  });

  it('Should addNotificationMock NOT to be called When called notifyDownloadSuccess and stateDownload.downloadFile.code not exist', () => {
    notifyDownloadError({
      addNotification: addNotificationMock,
      initStateDownload: initStateDownloadMock,
      stateDownload: {},
    });
    expect(addNotificationMock).not.toBeCalled();
    expect(initStateDownloadMock).not.toBeCalled();
  });
});

describe('setOnSubmitDownload', () => {
  const fetchDataMock = jest.fn();
  const fetchCustomMock = jest.fn();
  const dispatchMock = jest.fn();

  const defaultProps = {
    distributorId: 'distributorId',
    dispatch: dispatchMock,
    fetchCustom: fetchCustomMock,
    signal: {},
  };

  it('Should fetchDataFn NOT to be called when setOnSubmitDownload is called', () => {
    setOnSubmitDownload(defaultProps);
    expect(fetchDataMock).not.toBeCalled();
  });

  it('Should fetchDataFn to be called with data when setOnSubmitLock is called', () => {
    const setDownloadLoadingMock = jest.fn();
    const setDownloadErrorMock = jest.fn();
    const setDownloadSuccessMock = jest.fn();
    const fetchDownloadMock = jest.fn();
    setOnSubmitDownload({
      ...defaultProps,
      fetchDataFn: fetchDataMock,
      fetchDownloadFn: fetchDownloadMock,
      setDownloadLoadingFn: setDownloadLoadingMock,
      setDownloadErrorFn: setDownloadErrorMock,
      setDownloadSuccessFn: setDownloadSuccessMock,
    });
    expect(fetchDataMock).toBeCalledWith({
      fetchCustom: fetchCustomMock,
      setInit: setDownloadLoadingMock(dispatchMock),
      setError: setDownloadErrorMock(dispatchMock),
      setSuccess: setDownloadSuccessMock(dispatchMock),
      fetchServices: {
        downloadFile: {
          service: fetchDownloadMock,
          args: {
            distributorId: 'distributorId',
            signal: {},
          },
        },
      },
    });
  });
});
