import { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react';

export type TEnvironment = {
  apiUrl: string;
  baseUrl: string;
  fetchConfig: object;
  oidc: Record<string, boolean | string>;
};

export type TEnvironmentState = {
  environment?: null | TEnvironment;
  error?: unknown;
};

const initState: TEnvironmentState = {
  environment: null,
  error: null,
};

export const EnvironmentContext = createContext<TEnvironmentState>(initState);
EnvironmentContext.displayName = 'EnvironmentContext';

export const getFileEnv = (nodeEnv = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV) => `environment.${nodeEnv}.json`;

type TfetchEnv = {
  setEnvState: Dispatch<SetStateAction<TEnvironmentState>>;
  signal: AbortSignal;
  fetchFn?: typeof fetch;
  getFileEnvFn?: typeof getFileEnv;
};

export const fetchEnv = async ({ setEnvState, signal, fetchFn = fetch, getFileEnvFn = getFileEnv }: TfetchEnv) => {
  const fileName = getFileEnvFn();
  const response = await fetchFn(`/${fileName}`, { signal }).catch(error => setEnvState({ error }));
  setEnvState({ environment: await response?.json() });
};

/**
 * Hook to setState environment
 */
export const useEnv = (fetchEnvFn = fetchEnv, initStateCt = initState) => {
  const [envState, setEnvState] = useState(initStateCt);
  useEffect(() => {
    const abortController = new AbortController();
    if (envState.environment === null) {
      fetchEnvFn({ setEnvState, signal: abortController.signal });
    }
    return () => abortController.abort();
  }, [envState.environment, fetchEnvFn]);

  return { envState, setEnvState };
};

/**
 * Component wrapper to add environment context
 * @param {Component} children
 */
const EnvironmentProvider = ({ children, useEnvFn = useEnv }: { children: JSX.Element; useEnvFn?: typeof useEnv }) => {
  const { envState } = useEnvFn();
  return <EnvironmentContext.Provider value={envState}>{children}</EnvironmentContext.Provider>;
};

export default EnvironmentProvider;
