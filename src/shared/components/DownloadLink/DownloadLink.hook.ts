import { useCallback, useEffect, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import downloadjs from 'downloadjs';
import isEmptyOrNull from 'shared/helpers/isEmptyOrNull';
import { setInitialState } from 'shared/helpers/fetchHook';
import { fetchNotifyError, fetchNotifySuccess } from 'shared/helpers/fetchNotify';
import { NotificationContext } from 'App/NotificationProvider';
import { SERVICE_NAME, SUBMIT_DOWNLOAD_ID_FAILURE, SUBMIT_DOWNLOAD_ID_SUCCESS, SUCCESS_DOWNLOAD_MESSAGE } from './constants';

export const INITIAL_STATE = setInitialState(SERVICE_NAME);

type TuseQueryReturn = {
  data: unknown;
  isFetching: boolean;
  isFetched: boolean;
};

type TuseDownload = {
  path: string;
  hasSubmit: boolean;
  clearSubmitDownload: () => void;
  initialState?: ReturnType<typeof setInitialState>;
  useQueryFn?: (path: [string, { blob: boolean }], options: { enabled: boolean; onSuccess: () => void }) => TuseQueryReturn;
};

export const useDownload = ({ path, hasSubmit, clearSubmitDownload, initialState = INITIAL_STATE, useQueryFn = useQuery }: TuseDownload) => {
  const { data, isFetching, isFetched } = useQueryFn([path, { blob: true }], {
    enabled: hasSubmit,
    onSuccess: clearSubmitDownload,
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

/* ***************************************************************************************
 * Notification en cas d'erreur du téléchargement
 ***************************************************************************************** */

type TuseNotifyDownload = {
  state: typeof INITIAL_STATE;
  hasSubmit: boolean;
  path: string;
  initialStateCt?: typeof INITIAL_STATE;
  NotificationContextObj?: typeof NotificationContext;
  serviceName?: string;
};

type TuseNotifyDownloadError = TuseNotifyDownload & {
  fetchNotifyErrorFn?: typeof fetchNotifyError;
};

export const useNotifyDownloadError = ({
  state,
  hasSubmit,
  path,
  fetchNotifyErrorFn = fetchNotifyError,
  initialStateCt = INITIAL_STATE,
  NotificationContextObj = NotificationContext,
  serviceName = SERVICE_NAME,
}: TuseNotifyDownloadError) => {
  const { addNotification } = useContext(NotificationContextObj);
  useEffect(() => {
    if (state.anomaly[serviceName] !== null && hasSubmit) {
      fetchNotifyErrorFn({
        state,
        addNotification,
        serviceName,
        idNotifyAnomaly: `${SUBMIT_DOWNLOAD_ID_FAILURE}-${path}`,
      });
    }
  }, [addNotification, state, fetchNotifyErrorFn, initialStateCt, serviceName, path, hasSubmit]);
};

/* ***************************************************************************************
 * Notification en cas de succès du téléchargement
 ***************************************************************************************** */

type TuseNotifyDownloadSuccess = TuseNotifyDownload & {
  fetchNotifySuccessFn?: typeof fetchNotifySuccess;
};

export const useNotifyDownloadSuccess = ({
  state,
  hasSubmit,
  path,
  fetchNotifySuccessFn = fetchNotifySuccess,
  initialStateCt = INITIAL_STATE,
  NotificationContextObj = NotificationContext,
  serviceName = SERVICE_NAME,
}: TuseNotifyDownloadSuccess) => {
  const { addNotification } = useContext(NotificationContextObj);

  useEffect(() => {
    if (!isEmptyOrNull(state[serviceName]) && hasSubmit) {
      fetchNotifySuccessFn({
        addNotification,
        state: {
          ...state,
          label: SUCCESS_DOWNLOAD_MESSAGE,
        },
        idNotifySuccess: `${SUBMIT_DOWNLOAD_ID_SUCCESS}-${path}`,
      });
    }
  }, [addNotification, state, fetchNotifySuccessFn, initialStateCt, serviceName, path, hasSubmit]);
};
