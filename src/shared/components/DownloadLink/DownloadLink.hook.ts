import { useCallback, useEffect, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import downloadjs from 'downloadjs';
import isEmptyOrNull from 'shared/helpers/isEmptyOrNull';
import { setInitialState } from 'shared/helpers/fetchHook';
import { NotificationContext } from 'App/NotificationProvider';
import { TNotification } from 'App/NotificationProvider/Notifications';
import { SERVICE_NAME, SUCCESS_DOWNLOAD_MESSAGE } from './constants';

export const INITIAL_STATE = setInitialState(SERVICE_NAME);

type TuseQueryReturn = {
  data: unknown;
  isFetching: boolean;
  isFetched: boolean;
  error: unknown;
};

type TuseDownload = {
  path: string;
  hasSubmit: boolean;
  clearSubmitDownload: () => void;
  initialState?: ReturnType<typeof setInitialState>;
  useQueryFn?: (
    path: [string, { blob: boolean }],
    options: { enabled: boolean; onSuccess: () => void; onError: (err: { label: string }) => void },
  ) => TuseQueryReturn;
  NotificationContextObj?: typeof NotificationContext;
  onSuccess?: (arg1: () => void, arg2: (arg0: TNotification) => void) => () => void;
  onError?: (arg1: (arg0: TNotification) => void) => (arg2: { label: string }) => void;
};

export const onSuccessFn = (clearSubmitDownload: () => void, addNotification: (arg0: TNotification) => void) => () => {
  clearSubmitDownload();
  addNotification({
    label: SUCCESS_DOWNLOAD_MESSAGE,
    id: 'idNotifySuccess',
    type: 'success',
  });
};

export const onErrorFn = (addNotification: (arg0: TNotification) => void) => (err: { label: string }) => {
  addNotification({
    label: err?.label,
    id: 'idNotifyAnomaly',
  });
};

export const useDownload = ({
  path,
  hasSubmit,
  clearSubmitDownload,
  initialState = INITIAL_STATE,
  useQueryFn = useQuery,
  NotificationContextObj = NotificationContext,
  onSuccess = onSuccessFn,
  onError = onErrorFn,
}: TuseDownload) => {
  const { addNotification } = useContext(NotificationContextObj);
  const { data, isFetching, isFetched } = useQueryFn([path, { blob: true }], {
    enabled: hasSubmit,
    onSuccess: onSuccess(clearSubmitDownload, addNotification),
    onError: onError(addNotification),
  });
  return { state: { ...initialState, isLoading: isFetching, isLoaded: isFetched, downloadFile: data || [] } };
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
