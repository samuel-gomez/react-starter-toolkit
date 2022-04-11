import React, { useContext } from 'react';
import Loader, { MODES } from 'shared/components/Loader';
import EnvironmentProvider, { EnvironmentContext } from 'App/EnvironmentProvider';
import App from './App';

export const AppContainer = ({ EnvironmentContextObj = EnvironmentContext, AppCmpt = App }) => {
  const { environment } = useContext(EnvironmentContextObj);
  return !environment ? <Loader text="Chargement de l'environnement..." mode={MODES.get} classModifier="fullscreen" /> : <AppCmpt {...environment} />;
};

const AppWithEnvironment = () => (
  <EnvironmentProvider>
    <AppContainer />
  </EnvironmentProvider>
);

export default AppWithEnvironment;
