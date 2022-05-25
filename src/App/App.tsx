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
  FetchProviderCmpt?: typeof OidcSecure;
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
  FetchProviderCmpt = FetchProvider,
  useOidcAccessTokenFn = useOidcAccessToken,
  useOidcUserFn = useOidcUser,
}: TApp) => (
  <OidcProviderCmpt configuration={oidc}>
    <UserProvider useOidcUser={useOidcUserFn}>
      <OidcSecureCmpt>
        <FetchProviderCmpt apiUrl={apiUrl} fetchConfig={fetchConfig} useOidcAccessTokenFn={useOidcAccessTokenFn}>
          <NotificationProvider>
            <Router basename={baseUrl}>
              <Routes />
            </Router>
          </NotificationProvider>
        </FetchProviderCmpt>
      </OidcSecureCmpt>
    </UserProvider>
  </OidcProviderCmpt>
);

export default App;
