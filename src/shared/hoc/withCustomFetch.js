import React from 'react';
import { merge, cloneDeep } from 'lodash';
import withAuthentication from 'shared/hoc/withAuthentication';
import { STATUS_API } from 'shared/constants';
import { withEnvironment } from 'App/Environment';
import compose from 'shared/helpers/compose';

export const customFetch = ({ apiUrl, fetchAuthConfig, fetchFn = fetch, mergeFn = merge, cloneDeepFn = cloneDeep }) => async (path, customConfig) => {
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

export const withCustomFetch = (Component, mergeFn = merge, cloneDeepFn = cloneDeep) => ({ environment, authAccessToken, ...rest }) => {
  const { apiUrl, fetchConfig } = environment;
  const authConfig = {
    headers: {
      Authorization: `Bearer ${authAccessToken}`,
    },
  };
  const fetchAuthConfig = mergeFn(cloneDeepFn(fetchConfig), authConfig);
  return <Component {...rest} fetchCustom={customFetch({ apiUrl, fetchAuthConfig })} />;
};

export default compose(withEnvironment, withAuthentication, withCustomFetch);
