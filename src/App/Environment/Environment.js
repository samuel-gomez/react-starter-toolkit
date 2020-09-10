import React, { useState, useEffect } from 'react';
import { Loader } from '@axa-fr/react-toolkit-all';

const NODE_ENV = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV;
export const { Consumer: EnvironmentConsumer, Provider: EnvironmentProvider } = React.createContext();

/**
 * HOC pass the environment context props to Component
 * @param {*} Component
 */
export const withEnvironment = Component => props => (
  <EnvironmentConsumer>{store => (!store.environment ? <Loader /> : <Component {...props} {...store} />)}</EnvironmentConsumer>
);

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
      (async () => {
        try {
          const environment = await getImportFn();
          setEnvState({ environment });
        } catch (error) {
          setEnvState({ error });
        }
      })();
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
