import React, { createContext, useContext } from 'react';
import mergeObj from 'shared/helpers/mergeObj';
import { STATUS_API } from 'shared/constants';
import { UserContext } from 'App/UserProvider';

export const FetchContext = createContext({ fetchCustom: fetch });
export const FetchContextProvider = FetchContext.Provider;

export const setFetchCustom = ({ apiUrl, fetchAuthConfig, fetchFn = fetch, mergeObjFn = mergeObj }) => async (path, customConfig) => {
  const url = `${apiUrl}${path}`;
  const config = mergeObjFn(fetchAuthConfig, customConfig);
  const response = await fetchFn(url, config);
  if (config.blob && response.status === STATUS_API.SUCCESS) {
    return response.blob();
  }
  return {
    ...(await response.json()),
    statusHttp: response.status,
  };
};

const FetchProvider = ({ apiUrl, fetchConfig, children, mergeObjFn = mergeObj, setFetchCustomFn = setFetchCustom, UserContextObj = UserContext }) => {
  const { authAccessToken } = useContext(UserContextObj);
  const authConfig = {
    headers: {
      Authorization: `Bearer ${authAccessToken}`,
    },
  };
  const fetchAuthConfig = mergeObjFn(fetchConfig, authConfig);
  const fetchCustom = setFetchCustomFn({ apiUrl, fetchAuthConfig });
  return <FetchContextProvider value={{ fetchCustom }}>{children}</FetchContextProvider>;
};
export default FetchProvider;
