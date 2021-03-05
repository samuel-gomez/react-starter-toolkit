import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider, oidcLog, InMemoryWebStorage } from '@axa-fr/react-oidc-context';
import Routes from 'Layout/Routes';
import UserProvider from 'App/UserProvider';
import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';

const App = ({ oidc, fetchConfig, apiUrl, baseUrl }) => (
  <AuthenticationProvider loggerLevel={oidcLog.NONE} configuration={oidc} isEnabled={oidc.isEnabled} InMemoryWebStorage={InMemoryWebStorage}>
    <UserProvider>
      <FetchProvider apiUrl={apiUrl} fetchConfig={fetchConfig}>
        <NotificationProvider>
          <Router basename={baseUrl}>
            <Routes />
          </Router>
        </NotificationProvider>
      </FetchProvider>
    </UserProvider>
  </AuthenticationProvider>
);

export default App;
