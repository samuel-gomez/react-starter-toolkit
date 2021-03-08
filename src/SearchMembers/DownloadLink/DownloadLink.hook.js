import { useCallback, useEffect, useReducer, useContext, useRef } from 'react';
import { isNil } from 'lodash';
import downloadjs from 'downloadjs';
import fetchData from 'shared/helpers/fetchData';
import { STATUS_API, TIMEOUT_ERROR_MESSAGE, STATUS_HTTP } from 'shared/constants';
import { FetchContext } from 'App/FetchProvider';
import { NotificationContext } from 'App/NotificationProvider';
import fetchDownload from './DownloadLink.service';
import { FETCH_DOWNLOAD, SUBMIT_DOWNLOAD_ID_FAILURE, SUBMIT_DOWNLOAD_ID_SUCCESS, SUCCESS_DOWNLOAD_MESSAGE, TIMEOUT } from './constants';
import { formatDate } from '../../shared/helpers/formatDate';

export const initState = {
  isLoading: false,
  downloadFile: null,
  anomaly: {
    downloadFile: null,
  },
};

export const setStateDownloadLoading = ({ state }) => ({
  ...state,
  isLoading: true,
});

export const setStateDownloadSuccess = ({ state, payload }) => ({
  ...state,
  isLoading: false,
  downloadFile: payload?.downloadFile?.responseBody,
  code: payload?.downloadFile?.statusHttp,
  label: SUCCESS_DOWNLOAD_MESSAGE,
});

export const setStateDownloadFailure = ({ state, payload }) => ({
  ...state,
  isLoading: false,
  anomaly: {
    downloadFile: payload?.downloadFile,
  },
});

export const downloadReducer = (
  state,
  {
    type,
    payload,
    initStateCt = initState,
    setStateDownloadLoadingFn = setStateDownloadLoading,
    setStateDownloadSuccessFn = setStateDownloadSuccess,
    setStateDownloadFailureFn = setStateDownloadFailure,
  },
) => {
  switch (type) {
    case FETCH_DOWNLOAD.INIT:
      return initStateCt;
    case FETCH_DOWNLOAD.LOADING:
      return setStateDownloadLoadingFn({ state });
    case FETCH_DOWNLOAD.SUCCESS:
      return setStateDownloadSuccessFn({ state, payload });
    case FETCH_DOWNLOAD.FAILURE:
      return setStateDownloadFailureFn({ state, payload });
    default:
      return state;
  }
};

export const setDownloadInit = dispatch => () => dispatch({ type: FETCH_DOWNLOAD.INIT });
export const setDownloadLoading = dispatch => () => dispatch({ type: FETCH_DOWNLOAD.LOADING });
export const setDownloadError = dispatch => payload => dispatch({ type: FETCH_DOWNLOAD.FAILURE, payload });
export const setDownloadSuccess = dispatch => payload => dispatch({ type: FETCH_DOWNLOAD.SUCCESS, payload });

export const setOnSubmitDownload = ({
  fetchCustom,
  distributorId,
  dispatch,
  signal,
  fetchDataFn = fetchData,
  fetchDownloadFn = fetchDownload,
  setDownloadLoadingFn = setDownloadLoading,
  setDownloadErrorFn = setDownloadError,
  setDownloadSuccessFn = setDownloadSuccess,
}) => {
  fetchDataFn({
    fetchCustom,
    setInit: setDownloadLoadingFn(dispatch),
    setError: setDownloadErrorFn(dispatch),
    setSuccess: setDownloadSuccessFn(dispatch),
    fetchServices: {
      downloadFile: {
        service: fetchDownloadFn,
        args: {
          distributorId,
          signal,
        },
      },
    },
  });
};

export const setFileName = ({
  name = '',
  distributorId = '',
  date = new Date(),
  prefix = 'AxaMutuelle',
  extension = 'csv',
  formatDateFn = formatDate,
}) => `${prefix}_${name.replace(/ /g, '_').trim()}_${distributorId}_${formatDateFn(date, 'fr-CA').replace(/-/g, '')}.${extension}`;

export const setDownloadFile = ({ distributorId, name, stateDownload, setFileNameFn = setFileName, isNilFn = isNil, downloadjsFn = downloadjs }) => {
  const { downloadFile } = stateDownload;
  if (!isNilFn(downloadFile) && distributorId) {
    downloadjsFn(downloadFile, setFileNameFn({ distributorId, name }), 'text/csv');
  }
};

export const notifyDownloadError = ({ addNotification, stateDownload, initStateDownload, distributorId }) => {
  const { code, detail, label } = stateDownload?.anomaly?.downloadFile ?? { code: '', detail: '', label: '' };
  if (`${code}`.startsWith(`${STATUS_API.ERROR}`) || `${code}`.startsWith(`${STATUS_API.WARNING}`)) {
    initStateDownload();
    addNotification({
      code,
      detail,
      label,
      id: `${SUBMIT_DOWNLOAD_ID_FAILURE}-${distributorId}`,
    });
  }
};

export const notifyDownloadSuccess = ({ addNotification, stateDownload, distributorId, initStateDownload }) => {
  const { code, label, detail } = stateDownload;
  if (code === STATUS_API.SUCCESS) {
    initStateDownload();
    addNotification({
      code,
      detail,
      label,
      type: 'success',
      id: `${SUBMIT_DOWNLOAD_ID_SUCCESS}-${distributorId}`,
    });
  }
};

export const useDownload = ({
  distributorId,
  name,
  initStateDownloadCt = initState,
  downloadReducerFn = downloadReducer,
  setOnSubmitDownloadFn = setOnSubmitDownload,
  notifyDownloadErrorFn = notifyDownloadError,
  notifyDownloadSuccessFn = notifyDownloadSuccess,
  setDownloadInitFn = setDownloadInit,
  setDownloadFileFn = setDownloadFile,
  setDownloadErrorFn = setDownloadError,
  FetchContextObj = FetchContext,
  NotificationContextObj = NotificationContext,
}) => {
  const { fetchCustom } = useContext(FetchContextObj);
  const { addNotification } = useContext(NotificationContextObj);
  const [stateDownload, dispatch] = useReducer(downloadReducerFn, initStateDownloadCt);
  const initStateDownload = setDownloadInitFn(dispatch);
  const timerOut = useRef(null);

  const onDownload = useCallback(
    (e, abortController = new AbortController()) => {
      setOnSubmitDownloadFn({ fetchCustom, distributorId, dispatch, signal: abortController.signal });
      timerOut.current = setTimeout(() => {
        abortController.abort();
        setDownloadErrorFn(dispatch)({ downloadFile: { code: STATUS_HTTP.SERVER_ERROR, label: TIMEOUT_ERROR_MESSAGE } });
      }, TIMEOUT);
    },
    [setOnSubmitDownloadFn, fetchCustom, distributorId, setDownloadErrorFn],
  );

  useEffect(() => {
    if (!stateDownload.isLoading && stateDownload.anomaly.downloadFile === null) {
      clearTimeout(timerOut.current);
    }
  }, [stateDownload.anomaly.downloadFile, stateDownload.isLoading]);

  useEffect(
    () =>
      setDownloadFileFn({
        stateDownload,
        distributorId,
        name: name?.label ?? '',
      }),
    [setDownloadFileFn, stateDownload, distributorId, name],
  );

  useEffect(() => {
    notifyDownloadErrorFn({
      addNotification,
      stateDownload,
      initStateDownload,
      distributorId,
    });
  }, [addNotification, stateDownload, notifyDownloadErrorFn, initStateDownload, distributorId]);

  useEffect(() => {
    notifyDownloadSuccessFn({
      addNotification,
      stateDownload,
      initStateDownload,
      distributorId,
    });
  }, [addNotification, stateDownload, notifyDownloadSuccessFn, initStateDownload, distributorId]);

  return { onDownload, initStateDownload, stateDownload };
};
