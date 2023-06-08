import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { OidcProvider, useOidcUser, useOidcAccessToken, OidcSecure } from '@axa-fr/react-oidc';
import Routes from 'App/Routes';
import UserProvider from 'App/UserProvider';
import FetchProvider from 'App/FetchProvider';
import NotificationProvider from 'App/NotificationProvider';
import type { TEnvironment } from './EnvironmentProvider';
import { useOidcAccessTokenFnMock, useOidcUserFnMock } from './constants';

type TUserAndFetchProviders = Omit<TEnvironment, 'oidc'> & {
  isEnabled: boolean;
  UserProviderCmpt: typeof UserProvider;
  FetchProviderCmpt: typeof FetchProvider;
  useOidcUserFn: typeof useOidcUser;
  useOidcAccessTokenFn: typeof useOidcAccessToken;
  children: ReactNode;
};

const UserAndFetchProviders = ({
  apiUrl,
  fetchConfig,
  isEnabled,
  useOidcUserFn,
  useOidcAccessTokenFn,
  UserProviderCmpt,
  FetchProviderCmpt,
  children,
}: TUserAndFetchProviders) => (
  <UserProviderCmpt isEnabled={isEnabled} useOidcUserFn={useOidcUserFn}>
    <FetchProviderCmpt apiUrl={apiUrl} fetchConfig={fetchConfig} useOidcAccessTokenFn={useOidcAccessTokenFn}>
      {children}
    </FetchProviderCmpt>
  </UserProviderCmpt>
);

type TOidc = Omit<TUserAndFetchProviders, 'isEnabled'> &
  TEnvironment & {
    children: ReactNode;
    OidcProviderCmpt: typeof OidcProvider;
    OidcSecureCmpt: typeof OidcSecure;
    useOidcUserFn: typeof useOidcUser;
    useOidcAccessTokenFn: typeof useOidcAccessToken;
  };

const Oidc = ({ oidc, OidcProviderCmpt, OidcSecureCmpt, ...restProps }: TOidc) =>
  oidc.isEnabled ? (
    <OidcProviderCmpt configuration={oidc}>
      <OidcSecureCmpt>
        <UserAndFetchProviders {...restProps} isEnabled={Boolean(oidc.isEnabled)} />
      </OidcSecureCmpt>
    </OidcProviderCmpt>
  ) : (
    <UserAndFetchProviders
      {...restProps}
      isEnabled={Boolean(oidc.isEnabled)}
      useOidcUserFn={useOidcUserFnMock}
      useOidcAccessTokenFn={useOidcAccessTokenFnMock}
    />
  );

export type TApp = TEnvironment & {
  OidcCmpt?: typeof Oidc;
  useOidcUserFn?: typeof useOidcUser;
  useOidcAccessTokenFn?: typeof useOidcAccessToken;
  OidcProviderCmpt?: typeof OidcProvider;
  OidcSecureCmpt?: typeof OidcSecure;
  UserProviderCmpt?: typeof UserProvider;
  FetchProviderCmpt?: typeof FetchProvider;
  RoutesCmpt?: typeof Routes;
};

const App = ({
  oidc,
  fetchConfig,
  apiUrl,
  OidcCmpt = Oidc,
  useOidcUserFn = useOidcUser,
  useOidcAccessTokenFn = useOidcAccessToken,
  OidcProviderCmpt = OidcProvider,
  OidcSecureCmpt = OidcSecure,
  UserProviderCmpt = UserProvider,
  FetchProviderCmpt = FetchProvider,
  RoutesCmpt = Routes,
}: TApp) => (
  <OidcCmpt
    OidcProviderCmpt={OidcProviderCmpt}
    OidcSecureCmpt={OidcSecureCmpt}
    UserProviderCmpt={UserProviderCmpt}
    FetchProviderCmpt={FetchProviderCmpt}
    fetchConfig={fetchConfig}
    apiUrl={apiUrl}
    oidc={oidc}
    useOidcUserFn={useOidcUserFn}
    useOidcAccessTokenFn={useOidcAccessTokenFn}
  >
    <NotificationProvider>
      <Router>
        <RoutesCmpt />
      </Router>
    </NotificationProvider>
  </OidcCmpt>
);

export default App;
