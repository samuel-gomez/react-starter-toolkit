import { useCallback, useEffect, useContext, useState, useId } from 'react';
import { useQuery } from '@tanstack/react-query';
import downloadjs from 'downloadjs';
import { NotificationContext, TaddNotification } from 'providers/NotificationProvider';
import { SERVICE_NAME, SUCCESS_DOWNLOAD_MESSAGE } from './constants';

export const onSuccess =
  (clearSubmitDownload: TclearSubmitDownload, addNotification: TaddNotification, id = 'success-alert-id') =>
  () => {
    clearSubmitDownload();
    addNotification({
      id,
      label: SUCCESS_DOWNLOAD_MESSAGE,
      type: 'success',
    });
  };

export const onError =
  (addNotification: TaddNotification, id = 'anomaly-alert-id') =>
  (error: { label: string }) => {
    addNotification({
      id,
      label: error?.label,
    });
  };

type TuseQueryReturn = {
  data: unknown;
  isFetching: boolean;
  isFetched: boolean;
  error: unknown;
};

type TuseDownload = {
  path: string;
  hasSubmit: boolean;
  clearSubmitDownload: TclearSubmitDownload;
  useQueryFn?: (
    path: [string, { blob: boolean }],
    options: { enabled: boolean; onSuccess: () => void; onError: (err: { label: string }) => void },
  ) => TuseQueryReturn;
  NotificationContextObj?: typeof NotificationContext;
  onSuccessFn?: typeof onSuccess;
  onErrorFn?: typeof onError;
  useIdFn?: typeof useId;
};

export const useDownload = ({
  path,
  hasSubmit,
  clearSubmitDownload,
  useQueryFn = useQuery,
  NotificationContextObj = NotificationContext,
  onSuccessFn = onSuccess,
  onErrorFn = onError,
  useIdFn = useId,
}: TuseDownload) => {
  const { addNotification } = useContext(NotificationContextObj);
  const id = useIdFn();
  const { data, isFetching } = useQueryFn([path, { blob: true }], {
    enabled: hasSubmit,
    onSuccess: onSuccessFn(clearSubmitDownload, addNotification, id),
    onError: onErrorFn(addNotification, id),
  });
  return { isLoading: isFetching, [SERVICE_NAME]: (data || []) as Blob };
};

export const useSubmitDownload = (initialState = false) => {
  const [stateSubmitDownload, setStateSubmitDownload] = useState(initialState);

  const submitDownload = useCallback(() => {
    setStateSubmitDownload(true);
  }, []);

  const clearSubmitDownload = useCallback(() => {
    setStateSubmitDownload(false);
  }, []);

  return { stateSubmitDownload, submitDownload, clearSubmitDownload };
};

type TReturnUseSubmitDownload = ReturnType<typeof useSubmitDownload>;
type TclearSubmitDownload = TReturnUseSubmitDownload['clearSubmitDownload'];

/* ***************************************************************************************
 * Téléchargement du fichier dans le navigateur
 ***************************************************************************************** */

type TsetDownloadFile = {
  downloadjsFn?: typeof downloadjs;
  fileName: string;
  isLoading: boolean;
  downloadFile: Blob;
  hasSubmit: boolean;
  type?: string;
};

export const setDownloadFile = ({ fileName, isLoading, downloadFile, hasSubmit, type = 'text/csv', downloadjsFn = downloadjs }: TsetDownloadFile) => {
  if (downloadFile.size && fileName && hasSubmit && !isLoading) {
    downloadjsFn(downloadFile, fileName, type);
  }
};

type TuseDownloadFile = Omit<TsetDownloadFile, 'isEmptyOrNullFn' | 'downloadjsFn'> & {
  setDownloadFileFn?: typeof setDownloadFile;
};

export const useDownloadFile = ({ downloadFile, isLoading, fileName, hasSubmit, type, setDownloadFileFn = setDownloadFile }: TuseDownloadFile) => {
  useEffect(
    () =>
      setDownloadFileFn({
        downloadFile,
        isLoading,
        fileName,
        hasSubmit,
        type,
      }),
    [setDownloadFileFn, downloadFile, isLoading, fileName, hasSubmit, type],
  );
};
