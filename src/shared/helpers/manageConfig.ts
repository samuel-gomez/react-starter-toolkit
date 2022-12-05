import { API_URL } from 'shared/constants';

const manageConfig = (apiName: string, fetchAuthConfig: { headers?: object }) => {
  const cloneConfig = { ...fetchAuthConfig };
  apiName !== API_URL.VERCEL && delete cloneConfig.headers;
  return cloneConfig;
};

export default manageConfig;
