import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider, OidcSecure } from '@axa-fr/react-oidc-context';
import Environment, { withEnvironment } from 'App/Environment';
import 'App/App.scss';
import Routes from 'Layout/Routes';

export const RoutesBase = ({ environment }) => (
  <AuthenticationProvider configuration={environment.oidc} isEnabled={environment.oidc.isEnabled}>
    <Router>
      <OidcSecure>
        <Routes />
      </OidcSecure>
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
