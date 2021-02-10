import React, { useContext } from 'react';
import { Loader } from '@axa-fr/react-toolkit-all';
import Environment, { EnvironmentContext } from 'App/Environment';
import App from './App';

export const AppWithEnvironment = () => (
  <Environment>
    <AppContainer />
  </Environment>
);

export const AppContainer = ({ EnvironmentContextObj = EnvironmentContext }) => {
  const { environment } = useContext(EnvironmentContextObj);
  return !environment ? <Loader mode="get" className="af-loader af-loader--fullscreen" /> : <App {...environment} />;
};

export default AppWithEnvironment;
