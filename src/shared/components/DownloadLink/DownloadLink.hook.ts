import { useCallback, useEffect, useContext, useMemo, useState } from 'react';
import downloadjs from 'downloadjs';
import isEmptyOrNull from 'shared/helpers/isEmptyOrNull';
import { useFetchData, getApi, setInitialState } from 'shared/helpers/fetchHook';
import { fetchNotifyError, fetchNotifySuccess } from 'shared/helpers/fetchNotify';
import { NotificationContext } from 'App/NotificationProvider';
import { SERVICE_NAME, SUBMIT_DOWNLOAD_ID_FAILURE, SUBMIT_DOWNLOAD_ID_SUCCESS, SUCCESS_DOWNLOAD_MESSAGE } from './constants';

export const INITIAL_STATE = setInitialState(SERVICE_NAME);

type TuseDownload = {
  path: string;
  hasSubmit: boolean;
  initialState?: ReturnType<typeof setInitialState>;
  serviceName?: string;
  getApiFn?: typeof getApi;
  useFetchDataFn?: typeof useFetchData;
};

export const useDownload = ({
  path,
  hasSubmit,
  initialState = INITIAL_STATE,
  serviceName = SERVICE_NAME,
  getApiFn = getApi,
  useFetchDataFn = useFetchData,
}: TuseDownload): ReturnType<typeof useFetchData> =>
  useFetchDataFn({
    initialState,
    serviceName,
    condition: hasSubmit,
    service: useMemo(() => getApiFn(path, { blob: true }), [path, getApiFn]),
  });

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
};

export const setDownloadFile = ({ fileName, state, isEmptyOrNullFn = isEmptyOrNull, downloadjsFn = downloadjs }: TsetDownloadFile) => {
  const { downloadFile } = state;
  if (!isEmptyOrNullFn(downloadFile) && fileName) {
    downloadjsFn(downloadFile, fileName, 'text/csv');
  }
};

type TuseDownloadFile = {
  state: typeof INITIAL_STATE;
  fileName: string;
  setDownloadFileFn?: typeof setDownloadFile;
};

export const useDownloadFile = ({ state, fileName, setDownloadFileFn = setDownloadFile }: TuseDownloadFile) => {
  useEffect(
    () =>
      setDownloadFileFn({
        state,
        fileName,
      }),
    [setDownloadFileFn, state, fileName],
  );
};

/* ***************************************************************************************
 * Notification en cas d'erreur du téléchargement
 ***************************************************************************************** */

type TuseNotifyDownload = {
  state: typeof INITIAL_STATE;
  clearSubmitDownload: () => void;
  clearState: (initialStateCt: typeof INITIAL_STATE) => void;
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
  clearState,
  clearSubmitDownload,
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
      clearSubmitDownload();
      clearState(initialStateCt);
      fetchNotifyErrorFn({
        state,
        addNotification,
        serviceName,
        idNotifyAnomaly: `${SUBMIT_DOWNLOAD_ID_FAILURE}-${path}`,
      });
    }
  }, [addNotification, state, clearState, fetchNotifyErrorFn, initialStateCt, serviceName, path, hasSubmit, clearSubmitDownload]);
};

/* ***************************************************************************************
 * Notification en cas de succès du téléchargement
 ***************************************************************************************** */

type TuseNotifyDownloadSuccess = TuseNotifyDownload & {
  fetchNotifySuccessFn?: typeof fetchNotifySuccess;
};

export const useNotifyDownloadSuccess = ({
  state,
  clearState,
  clearSubmitDownload,
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
      clearSubmitDownload();
      clearState(initialStateCt);
      fetchNotifySuccessFn({
        addNotification,
        state: {
          ...state,
          label: SUCCESS_DOWNLOAD_MESSAGE,
        },
        idNotifySuccess: `${SUBMIT_DOWNLOAD_ID_SUCCESS}-${path}`,
      });
    }
  }, [addNotification, state, clearState, fetchNotifySuccessFn, initialStateCt, serviceName, path, hasSubmit, clearSubmitDownload]);
};
