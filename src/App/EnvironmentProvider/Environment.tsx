import { useState, useEffect, createContext } from 'react';

const NODE_ENV = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV;

export type TEnvironment = {
  apiUrl: string;
  baseUrl: string;
  fetchConfig: object;
  oidc: Record<string, boolean | string>;
};

export type TEnvironmentState = {
  environment: null | TEnvironment;
  error: null | string | object;
};

const initState: TEnvironmentState = {
  environment: null,
  error: null,
};

export const EnvironmentContext = createContext<TEnvironmentState>(initState);
const { Provider } = EnvironmentContext;
EnvironmentContext.displayName = 'EnvironmentContext';

export const getImport = () => import(`../../../public/environment.${NODE_ENV}.json`);

/**
 * Hook to setState environment
 */
export const useEnv = (getImportFn = getImport, initStateCt = initState) => {
  const [envState, setEnvState] = useState(initStateCt);
  useEffect(() => {
    if (envState.environment === null) {
      getImportFn()
        .then(environment => setEnvState({ environment, error: null }))
        .catch(error => setEnvState({ environment: null, error }));
    }
  }, [envState.environment, getImportFn]);

  return { envState, setEnvState };
};

/**
 * Component wrapper to add environment context
 * @param {Component} children
 */
const EnvironmentProvider = ({ children, useEnvFn = useEnv }: { children: JSX.Element; useEnvFn?: typeof useEnv }) => {
  const { envState } = useEnvFn();
  return <Provider value={envState}>{children}</Provider>;
};

export default EnvironmentProvider;
