import React, { useContext } from 'react';
import { Loader } from '@axa-fr/react-toolkit-all';
import EnvironmentProvider, { EnvironmentContext } from 'App/EnvironmentProvider';
import App from './App';

export const AppContainer = ({ EnvironmentContextObj = EnvironmentContext }) => {
  const { environment } = useContext(EnvironmentContextObj);
  return !environment ? <Loader mode="get" className="af-loader af-loader--fullscreen" /> : <App {...environment} />;
};

const AppWithEnvironment = () => (
  <EnvironmentProvider>
    <AppContainer />
  </EnvironmentProvider>
);

export default AppWithEnvironment;
