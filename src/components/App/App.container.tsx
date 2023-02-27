'use client';
import { useContext } from 'react';
import Loader, { MODES } from 'shared/components/Loader';
import EnvironmentProvider, { EnvironmentContext } from 'providers/EnvironmentProvider';
import App from './App';

type TAppContainer = { children: React.ReactNode; EnvironmentContextObj?: typeof EnvironmentContext; AppCmpt?: typeof App };

export const AppContainer = ({ children, EnvironmentContextObj = EnvironmentContext, AppCmpt = App }: TAppContainer) => {
  const { environment } = useContext(EnvironmentContextObj);
  return !environment ? (
    <Loader text="Chargement de l'environnement..." mode={MODES.get} classModifier="fullscreen" />
  ) : (
    <AppCmpt {...environment}>{children}</AppCmpt>
  );
};

const AppWithEnvironment = ({ children }: { children: React.ReactNode }) => (
  <EnvironmentProvider>
    <AppContainer>{children}</AppContainer>
  </EnvironmentProvider>
);

export default AppWithEnvironment;
