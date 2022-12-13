import { API_URL } from 'shared/constants';

const manageConfig = (apiName: string, fetchAuthConfig: { headers?: object }) => {
  const cloneConfig = { ...fetchAuthConfig };
  apiName !== API_URL.BASE && delete cloneConfig.headers;
  return cloneConfig;
};

export default manageConfig;
