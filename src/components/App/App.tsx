import { ReactNode } from 'react';
import { OidcProvider, useOidcUser, useOidcAccessToken, OidcSecure } from '@axa-fr/react-oidc';
import UserProvider from 'providers/UserProvider';
import FetchProvider from 'providers/FetchProvider';
import NotificationProvider from 'providers/NotificationProvider';
import type { TEnvironment } from 'providers/EnvironmentProvider';
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
    <OidcProviderCmpt configuration={{ ...oidc }}>
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
  children: React.ReactNode;
  OidcCmpt?: typeof Oidc;
  useOidcUserFn?: typeof useOidcUser;
  useOidcAccessTokenFn?: typeof useOidcAccessToken;
  OidcProviderCmpt?: typeof OidcProvider;
  OidcSecureCmpt?: typeof OidcSecure;
  UserProviderCmpt?: typeof UserProvider;
  FetchProviderCmpt?: typeof FetchProvider;
};

const App = ({
  children,
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
    <NotificationProvider>{children}</NotificationProvider>
  </OidcCmpt>
);

export default App;
