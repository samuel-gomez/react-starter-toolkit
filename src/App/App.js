import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { OidcProvider, useOidcUser, useOidcAccessToken, OidcSecure } from '@axa-fr/react-oidc-context';
import Routes from 'App/Routes';
import UserProvider from 'App/UserProvider';
import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';
import { PropTypes } from 'prop-types';

const App = ({ oidc, fetchConfig, apiUrl, baseUrl, OidcProviderCmpt, OidcSecureCmpt, useOidcUserFn, useOidcAccessTokenFn }) => (
  <OidcProviderCmpt configuration={oidc}>
    <UserProvider useOidcUser={useOidcUserFn}>
      <OidcSecureCmpt>
        <FetchProvider apiUrl={apiUrl} fetchConfig={fetchConfig} useOidcAccessToken={useOidcAccessTokenFn}>
          <NotificationProvider>
            <Router basename={baseUrl}>
              <Routes />
            </Router>
          </NotificationProvider>
        </FetchProvider>
      </OidcSecureCmpt>
    </UserProvider>
  </OidcProviderCmpt>
);

App.propTypes = {
  OidcProviderCmpt: PropTypes.func,
  OidcSecureCmpt: PropTypes.func,
  useOidcUserFn: PropTypes.func,
  useOidcAccessTokenFn: PropTypes.func,
};

App.defaultProps = {
  OidcProviderCmpt: OidcProvider,
  OidcSecureCmpt: OidcSecure,
  useOidcUserFn: useOidcUser,
  useOidcAccessTokenFn: useOidcAccessToken,
};

export default App;
