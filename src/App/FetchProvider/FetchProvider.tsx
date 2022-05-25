import { createContext } from 'react';
import mergeObj from 'shared/helpers/mergeObj';
import { STATUS_API } from 'shared/constants';
import { useOidcAccessToken } from '@axa-fr/react-oidc-context';

export type FetchContextType = {
  fetchCustom: (path: string, customConfig: object) => Promise<Response> | null;
};

export const FetchContext = createContext<FetchContextType | object>({});
FetchContext.displayName = 'FetchContext';

export type TFetchCustom = {
  apiUrl: string;
  fetchAuthConfig: object;
  fetchFn?: typeof fetch;
  mergeObjFn?: typeof mergeObj;
};

export const setFetchCustom =
  ({ apiUrl, fetchAuthConfig, fetchFn = fetch, mergeObjFn = mergeObj }: TFetchCustom) =>
  async (path: string, customConfig: object) => {
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

export type TFetchProvider = Omit<TFetchCustom, 'fetchFn' | 'fetchAuthConfig'> & {
  fetchConfig: object;
  children: JSX.Element;
  useOidcAccessToken: typeof useOidcAccessToken;
  setFetchCustomFn?: typeof setFetchCustom;
};

const FetchProvider = ({
  apiUrl,
  fetchConfig,
  children,
  useOidcAccessToken,
  mergeObjFn = mergeObj,
  setFetchCustomFn = setFetchCustom,
}: TFetchProvider) => {
  const { accessToken } = useOidcAccessToken();
  const authConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const fetchAuthConfig = mergeObjFn(fetchConfig, authConfig);
  const fetchCustom = setFetchCustomFn({ apiUrl, fetchAuthConfig });
  return <FetchContext.Provider value={{ fetchCustom }}>{children}</FetchContext.Provider>;
};
export default FetchProvider;
