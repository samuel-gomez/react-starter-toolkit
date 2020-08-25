import React, { useState, useEffect } from 'react';
import { Loader } from '@axa-fr/react-toolkit-all';

export const EnvironmentContext = React.createContext();
export const EnvironmentConsumer = EnvironmentContext.Consumer;
export const EnvironmentProvider = EnvironmentContext.Provider;

/**
 * HOC pass the environment context props to Component
 * @param {*} Component
 */
export const withEnvironment = Component => props => (
  <EnvironmentConsumer>{store => (!store.environment ? <Loader /> : <Component {...props} {...store} />)}</EnvironmentConsumer>
);

/**
 * return environment config file
 * @param {*} nodeEnv
 */
export const getFileEnv = (nodeEnv = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV) =>
  nodeEnv === 'production' ? 'environment.json' : `environment.${nodeEnv}.json`;

/**
 * Fetch the environment config file and setState
 * @param {Function} setEnvState
 */
export const fetchEnv = async ({ setEnvState, fetchFn = fetch, getFileEnvFn = getFileEnv }) => {
  const fileName = getFileEnvFn();
  const response = await fetchFn(`/${fileName}`);
  const environment = await response.json();
  setEnvState({ environment });
};

const initState = {
  environment: null,
};

/**
 * Hook to setState environment
 */
export const useEnv = (initStateCt = initState, fetchEnvFn = fetchEnv) => {
  const [envState, setEnvState] = useState(initStateCt);

  useEffect(() => {
    if (envState.environment === null) {
      fetchEnvFn({ setEnvState });
    }
  }, [envState.environment, fetchEnvFn]);

  return { envState };
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
