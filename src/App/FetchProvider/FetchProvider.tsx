import { createContext } from 'react';
import { QueryClient, QueryClientProvider, QueryKey } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import mergeObj from 'shared/helpers/mergeObj';
import { STATUS_API } from 'shared/constants';
import { useOidcAccessToken } from '@axa-fr/react-oidc-context';

export type FetchContextType = {
  fetchCustom: (path: string, customConfig: object) => Promise<Response> | null;
  queryClient: QueryClient;
};

export const FetchContext = createContext<FetchContextType | object>({});
FetchContext.displayName = 'FetchContext';

export type TFetchCustom = {
  apiUrl: string;
  fetchAuthConfig: object;
  fetchFn?: typeof fetch;
  mergeObjFn?: typeof mergeObj;
};

type TResponse = {
  status: number;
  blob: () => Promise<unknown>;
  json: () => Promise<object>;
};

type TConfig = {
  blob: boolean;
};

export const buildResponse = async (response: TResponse, config: TConfig) => {
  const { status } = response;
  switch (true) {
    case status.toString().startsWith(STATUS_API.ERROR.toString()):
    case status.toString().startsWith(STATUS_API.WARNING.toString()):
      throw response;
    case status === STATUS_API.SUCCESS:
      if (config.blob) {
        return response.blob();
      }
      return {
        ...(await response.json()),
        statusHttp: status,
      };
    default:
      return {
        statusHttp: status,
      };
  }
};

export const setFetchCustom =
  ({ apiUrl, fetchAuthConfig, fetchFn = fetch, mergeObjFn = mergeObj }: TFetchCustom) =>
  async (queryKey: QueryKey) => {
    const [path, customConfig] = queryKey;
    const url = `${apiUrl}${path}`;
    const config = mergeObjFn(fetchAuthConfig, customConfig);
    const response = await fetchFn(url, config);
    return buildResponse(response, config);
  };

export type TFetchProvider = Omit<TFetchCustom, 'fetchFn' | 'fetchAuthConfig'> & {
  fetchConfig: object;
  children: JSX.Element;
  useOidcAccessTokenFn: typeof useOidcAccessToken;
  setFetchCustomFn?: typeof setFetchCustom;
  showReactQueryDevtoolsComponent?: (process: string | undefined) => JSX.Element | boolean;
};

export const defaultQueryWithAuthFn = async (queryKey: QueryKey, fetchCustom: ReturnType<typeof setFetchCustom>) => fetchCustom(queryKey);

export const showReactQueryDevtools = (process: string | undefined) =>
  process === 'development' && <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />;

const FetchProvider = ({
  apiUrl,
  fetchConfig,
  children,
  useOidcAccessTokenFn,
  mergeObjFn = mergeObj,
  setFetchCustomFn = setFetchCustom,
  showReactQueryDevtoolsComponent = showReactQueryDevtools,
}: TFetchProvider) => {
  const { accessToken } = useOidcAccessTokenFn();
  const authConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const fetchAuthConfig = mergeObjFn(fetchConfig, authConfig);
  const fetchCustom = setFetchCustomFn({ apiUrl, fetchAuthConfig });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        queryFn: ({ queryKey }) => defaultQueryWithAuthFn(queryKey, fetchCustom),
      },
    },
  });

  return (
    <FetchContext.Provider value={{ fetchCustom, queryClient }}>
      <QueryClientProvider client={queryClient}>
        {children}
        {showReactQueryDevtoolsComponent(process.env.NODE_ENV)}
      </QueryClientProvider>
    </FetchContext.Provider>
  );
};
export default FetchProvider;
