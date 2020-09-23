import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider, oidcLog, InMemoryWebStorage } from '@axa-fr/react-oidc-context';
import Environment, { withEnvironment } from 'App/Environment';
import Routes from 'Layout/Routes';

export const RoutesBase = ({ environment }) => (
  <AuthenticationProvider
    loggerLevel={oidcLog.NONE}
    configuration={environment.oidc}
    isEnabled={environment.oidc.isEnabled}
    InMemoryWebStorage={InMemoryWebStorage}
  >
    <Router>
      <Routes />
    </Router>
  </AuthenticationProvider>
);

const RouteBaseWithEnvironment = withEnvironment(RoutesBase);

const App = () => (
  <Environment>
    <RouteBaseWithEnvironment />
  </Environment>
);

export default App;
