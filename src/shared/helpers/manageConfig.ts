import { API_URL } from 'shared/constants';

const manageConfig = (apiName: string, fetchAuthConfig: { headers?: object }) => {
  const { headers, ...restFetchAuthConfig } = fetchAuthConfig;
  return apiName === API_URL.BASE ? { headers, ...restFetchAuthConfig } : restFetchAuthConfig;
};

export default manageConfig;
