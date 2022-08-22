import { useCallback, useEffect, useContext, useState, useId } from 'react';
import { useQuery } from '@tanstack/react-query';
import downloadjs from 'downloadjs';
import { setInitialState, isEmptyOrNull } from 'shared/helpers';
import { NotificationContext, TaddNotification } from 'App/NotificationProvider';
import { SERVICE_NAME, SUCCESS_DOWNLOAD_MESSAGE } from './constants';

export const INITIAL_STATE = setInitialState(SERVICE_NAME);

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
  initialState?: ReturnType<typeof setInitialState>;
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
  initialState = INITIAL_STATE,
  useQueryFn = useQuery,
  NotificationContextObj = NotificationContext,
  onSuccessFn = onSuccess,
  onErrorFn = onError,
  useIdFn = useId,
}: TuseDownload) => {
  const { addNotification } = useContext(NotificationContextObj);
  const id = useIdFn();
  const { data, isFetching, isFetched } = useQueryFn([path, { blob: true }], {
    enabled: hasSubmit,
    onSuccess: onSuccessFn(clearSubmitDownload, addNotification, id),
    onError: onErrorFn(addNotification, id),
  });
  return { state: { ...initialState, isLoading: isFetching, isLoaded: isFetched, [SERVICE_NAME]: data || [] } };
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
  isEmptyOrNullFn?: typeof isEmptyOrNull;
  downloadjsFn?: typeof downloadjs;
  fileName: string;
  state: typeof INITIAL_STATE;
  hasSubmit: boolean;
};

export const setDownloadFile = ({ fileName, state, hasSubmit, isEmptyOrNullFn = isEmptyOrNull, downloadjsFn = downloadjs }: TsetDownloadFile) => {
  const { downloadFile, isLoading } = state;
  if (!isEmptyOrNullFn(downloadFile) && fileName && hasSubmit && !isLoading) {
    downloadjsFn(downloadFile, fileName, 'text/csv');
  }
};

type TuseDownloadFile = {
  state: typeof INITIAL_STATE;
  fileName: string;
  hasSubmit: boolean;
  setDownloadFileFn?: typeof setDownloadFile;
};

export const useDownloadFile = ({ state, fileName, hasSubmit, setDownloadFileFn = setDownloadFile }: TuseDownloadFile) => {
  useEffect(
    () =>
      setDownloadFileFn({
        state,
        fileName,
        hasSubmit,
      }),
    [setDownloadFileFn, state, fileName, hasSubmit],
  );
};
