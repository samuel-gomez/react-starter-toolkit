import React, { useState, useEffect } from 'react';

const NODE_ENV = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV;

export const EnvironmentContext = React.createContext();
export const { Provider: EnvironmentProvider } = EnvironmentContext;

const initState = {
  environment: null,
  error: null,
};

export const getImport = () => import(`../../../public/environment.${NODE_ENV}.json`);

/**
 * Hook to setState environment
 */
export const useEnv = (getImportFn = getImport, initStateCt = initState) => {
  const [envState, setEnvState] = useState(initStateCt);

  useEffect(() => {
    if (envState.environment === null) {
      getImportFn()
        .then(environment => setEnvState({ environment }))
        .catch(error => setEnvState({ error }));
    }
  }, [envState.environment, getImportFn]);

  return { envState, setEnvState };
};

/**
 * Component wrapper to add environment context
 * @param {Component} children
 */
const Environment = ({ children }) => {
  const { envState } = useEnv();
  return <EnvironmentProvider value={envState}>{children}</EnvironmentProvider>;
};

export default Environment;
