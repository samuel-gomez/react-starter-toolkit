import React from 'react';
import { merge, cloneDeep } from 'lodash';
import withAuthentication from 'shared/hoc/withAuthentication';
import { STATUS_API } from 'shared/constants';
import { withEnvironment } from 'App/Environment';
import compose from 'shared/helpers/compose';

export const customFetch = fetch => apiBaseUrl => fetchConfig => async (path, customConfig) => {
  const url = `${apiBaseUrl}${path}?apiKey=uL19TxbOTqdHcHTPd1AgQbR-FjqEDqWK`;
  const config = merge(cloneDeep(fetchConfig), customConfig);
  const response = await fetch(url, config);
  if (config.blob && response.status === STATUS_API.SUCCESS) {
    return response.blob();
  }
  return {
    ...(await response.json()),
    statusHttp: response.status,
  };
};

export const withCustomFetch = fetch => Component => props => {
  const {
    environment: { apiUrl, fetchConfig },
    authAccessToken,
  } = props;
  const authConfig = {
    headers: {
      Authorization: `Bearer ${authAccessToken}`,
    },
  };
  const fetchAuthConfig = merge(cloneDeep(fetchConfig), authConfig);
  return <Component {...props} fetch={customFetch(fetch)(apiUrl)(fetchAuthConfig)} />;
};

const withEnhancedCustomFetch = compose(withEnvironment, withAuthentication(), withCustomFetch(fetch));
export default withEnhancedCustomFetch;
