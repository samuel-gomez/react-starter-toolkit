import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider, oidcLog, InMemoryWebStorage } from '@axa-fr/react-oidc-context';
import Routes from 'Layout/Routes';
import UserProvider from './User';
import FetchProvider from './Fetch';

const App = ({ oidc, fetchConfig, apiUrl, baseUrl }) => (
  <AuthenticationProvider loggerLevel={oidcLog.NONE} configuration={oidc} isEnabled={oidc.isEnabled} InMemoryWebStorage={InMemoryWebStorage}>
    <UserProvider>
      <FetchProvider apiUrl={apiUrl} fetchConfig={fetchConfig}>
        <Router basename={baseUrl}>
          <Routes />
        </Router>
      </FetchProvider>
    </UserProvider>
  </AuthenticationProvider>
);

export default App;
