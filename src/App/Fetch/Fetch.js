import React, { createContext, useContext } from 'react';
import { merge, cloneDeep } from 'lodash';
import { STATUS_API } from 'shared/constants';
import { UserContext } from 'App/User';

export const FetchContext = createContext({ fetchCustom: fetch });
export const FetchContextProvider = FetchContext.Provider;

export const setFetchCustom = ({ apiUrl, fetchAuthConfig, fetchFn = fetch, mergeFn = merge, cloneDeepFn = cloneDeep }) => async (
  path,
  customConfig,
) => {
  const url = `${apiUrl}${path}`;
  const config = mergeFn(cloneDeepFn(fetchAuthConfig), customConfig);
  const response = await fetchFn(url, config);
  if (config.blob && response.status === STATUS_API.SUCCESS) {
    return response.blob();
  }
  return {
    ...(await response.json()),
    statusHttp: response.status,
  };
};

const FetchProvider = ({
  apiUrl,
  fetchConfig,
  children,
  mergeFn = merge,
  cloneDeepFn = cloneDeep,
  setFetchCustomFn = setFetchCustom,
  UserContextObj = UserContext,
}) => {
  const { authAccessToken } = useContext(UserContextObj);
  const authConfig = {
    headers: {
      Authorization: `Bearer ${authAccessToken}`,
    },
  };
  const fetchAuthConfig = mergeFn(cloneDeepFn(fetchConfig), authConfig);
  const fetchCustom = setFetchCustomFn({ apiUrl, fetchAuthConfig });
  return <FetchContextProvider value={{ fetchCustom }}>{children}</FetchContextProvider>;
};
export default FetchProvider;
