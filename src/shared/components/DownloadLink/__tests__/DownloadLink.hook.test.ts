import { renderHook, act } from '@testing-library/react-hooks';
import { SUCCESS_DOWNLOAD_MESSAGE } from './../constants';
import { useDownload, useSubmitDownload, setDownloadFile, onSuccess, onError } from '../DownloadLink.hook';

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

  it('Should not call downloadjsFn When state.downloadFile is empty', () => {
    setDownloadFile({
      fileName: 'test.csv',
      downloadFile: new Blob(),
      isLoading: false,
      hasSubmit: false,
      downloadjsFn: downloadjsFnMock,
    });

    expect(downloadjsFnMock).not.toBeCalled();
  });

  it('Should call downloadjsFn When state.downloadFile is NOT empty', () => {
    setDownloadFile({
      fileName: 'test.csv',
      downloadFile: new Blob(['test']),
      isLoading: false,
      hasSubmit: true,
      downloadjsFn: downloadjsFnMock,
    });

    expect(downloadjsFnMock).toBeCalledWith(new Blob(['test']), 'test.csv', 'text/csv');
  });
});

describe('useDownload', () => {
  const defaultProps = {
    path: 'elections/12/resultats',
    hasSubmit: false,
    clearSubmitDownload: jest.fn(),
    useQueryFn: jest.fn().mockReturnValue({
      data: new Blob(['test']),
      isFetching: false,
    }),
  };
  it('Should return initial state when useDownload called with path: "elections/12/resultats" and hasSubmit: false', () => {
    const { result } = renderHook(() => useDownload({ ...defaultProps }));

    act(() => {
      expect(result.current).toEqual({
        isLoading: false,
        downloadFile: new Blob(['test']),
      });
    });
  });
});

describe('onSuccess', () => {
  it('Should called clearSubmitDownloadMock and addNotificationMock', () => {
    const clearSubmitDownloadMock = jest.fn();
    const addNotificationMock = jest.fn();
    onSuccess(clearSubmitDownloadMock, addNotificationMock)();
    expect(clearSubmitDownloadMock).toBeCalled();
    expect(addNotificationMock).toBeCalledWith({
      label: SUCCESS_DOWNLOAD_MESSAGE,
      id: 'success-alert-id',
      type: 'success',
    });
  });
});

describe('onError', () => {
  it('Should called addNotificationMock', () => {
    const addNotificationMock = jest.fn();
    const error = { label: 'test' };
    onError(addNotificationMock)(error);
    expect(addNotificationMock).toBeCalledWith({
      label: error.label,
      id: 'anomaly-alert-id',
    });
  });
});
