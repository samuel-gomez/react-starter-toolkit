import { BrowserRouter as Router } from 'react-router-dom';
import { OidcProvider, useOidcUser, useOidcAccessToken, OidcSecure } from '@axa-fr/react-oidc-context';
import Routes from 'App/Routes';
import UserProvider from 'App/UserProvider';
import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';
import type { TEnvironment } from './EnvironmentProvider';

type TApp = TEnvironment & {
  OidcProviderCmpt?: typeof OidcProvider;
  OidcSecureCmpt?: typeof OidcSecure;
  useOidcUserFn?: typeof useOidcUser;
  useOidcAccessTokenFn?: typeof useOidcAccessToken;
};

const App = ({
  oidc,
  fetchConfig,
  apiUrl,
  baseUrl,
  OidcProviderCmpt = OidcProvider,
  OidcSecureCmpt = OidcSecure,
  useOidcUserFn = useOidcUser,
  useOidcAccessTokenFn = useOidcAccessToken,
}: TApp) => (
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

export default App;
