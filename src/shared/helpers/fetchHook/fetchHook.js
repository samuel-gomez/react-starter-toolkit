import { JSON_CONTENT_HEADER, STATUS_HTTP, TIMEOUT_ERROR_MESSAGE, TIMEOUT } from 'shared/constants';
import { useContext, useReducer, useEffect, useMemo } from 'react';
import fetchData from 'shared/helpers/fetchHook/fetchData';
import { emptyFunction } from 'shared/testsUtils';
import { FetchContext } from 'App/FetchProvider';

export const CLEAR = 'CLEAR';
export const LOADING = 'LOADING';
export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';

export const setInitialState = (serviceName, defaultValue = []) => ({
  isLoading: false,
  isLoaded: false,
  [serviceName]: defaultValue,
  anomaly: {
    [serviceName]: null,
  },
});

export const loading = ({ state }) => ({
  ...state,
  isLoading: true,
});

export const success = ({ state, payload, serviceName, computeSuccess = emptyFunction }) => ({
  ...state,
  isLoading: false,
  isLoaded: true,
  code: payload[serviceName].statusHttp,
  ...(computeSuccess({ responseBody: payload[serviceName].responseBody, state: state[serviceName] }) || {
    [serviceName]: payload[serviceName].responseBody,
  }),
});

export const setAnomalyWithAbort = ({ payload, serviceName }) =>
  payload?.message?.includes('aborted') ? { code: STATUS_HTTP.SERVER_ERROR, label: TIMEOUT_ERROR_MESSAGE } : payload[serviceName];

export const failure = ({ state, payload, serviceName, setAnomalyWithAbortFn = setAnomalyWithAbort }) => ({
  ...state,
  isLoading: false,
  anomaly: {
    [serviceName]: setAnomalyWithAbortFn({ payload, serviceName }),
  },
});

export const setStateFns = {
  loading,
  success,
  failure,
};

export const reducer =
  ({ serviceName, computeSuccess }) =>
  (state, { type, payload, setState = setStateFns, otherCases = {} }) =>
    ((
      {
        [CLEAR]: () => payload,
        [LOADING]: () => setState.loading({ state }),
        [SUCCESS]: () => setState.success({ state, payload, serviceName, computeSuccess }),
        [FAILURE]: () => setState.failure({ state, payload, serviceName }),
        ...otherCases,
      }[type] || (() => state)
    )());

export const setClear = dispatch => payload => dispatch({ type: CLEAR, payload });
export const setLoading = dispatch => () => dispatch({ type: LOADING });
export const setError = dispatch => payload => dispatch({ type: FAILURE, payload });
export const setSuccess = dispatch => payload => dispatch({ type: SUCCESS, payload });

export const setBodyArgs = body => (body !== null ? { body } : {});

export const fnsFetchData = {
  reducer,
  fetchData,
  setLoading,
  setError,
  setSuccess,
  setClear,
  setBodyArgs,
};

export const useFetchData = ({
  service,
  serviceName,
  initialState,
  computeSuccess,
  args = {},
  condition = true,
  FetchContextObj = FetchContext,
  callbackSuccess = null,
  fns = fnsFetchData,
}) => {
  const { fetchCustom } = useContext(FetchContextObj);
  const [state, dispatch] = useReducer(fns.reducer({ serviceName, computeSuccess }), initialState);

  const clearState = fns.setClear(dispatch);
  const setLoadingDispatched = useMemo(() => fns.setLoading(dispatch), [fns]);
  const setErrorDispatched = useMemo(() => fns.setError(dispatch), [fns]);
  const setSuccessDispatched = useMemo(() => fns.setSuccess(dispatch), [fns]);

  const { body = null } = args;

  useEffect(() => {
    let abortController;
    let timerOut;

    if (condition) {
      abortController = new AbortController();
      timerOut = setTimeout(() => abortController.abort(), TIMEOUT);

      fns.fetchData({
        fetchCustom,
        callbackSuccess,
        setLoading: setLoadingDispatched,
        setError: setErrorDispatched,
        setSuccess: setSuccessDispatched,
        fetchServices: {
          [serviceName]: {
            service,
            args: {
              signal: abortController.signal,
              ...fns.setBodyArgs(body),
            },
          },
        },
      });
    }

    return () => {
      if (abortController && timerOut) {
        abortController.abort();
        clearTimeout(timerOut);
      }
    };
  }, [fetchCustom, fns, service, serviceName, condition, setErrorDispatched, setSuccessDispatched, body, callbackSuccess, setLoadingDispatched]);

  return { state, clearState };
};

export const callApi =
  method =>
  path =>
  ({ fetchCustom, signal, body = {} }) =>
    fetchCustom(path, {
      signal,
      method,
      body: JSON.stringify(body),
      headers: {
        ...JSON_CONTENT_HEADER,
      },
    });

export const postApi = callApi('POST');
export const putApi = callApi('PUT');

export const getApi =
  (path, otherParams = {}) =>
  ({ fetchCustom, signal }) =>
    fetchCustom(path, {
      signal,
      ...otherParams,
      headers: {
        ...JSON_CONTENT_HEADER,
      },
    });
