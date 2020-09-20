/**
 * This HOC is useful for testing components that need to be wwrapped by environment and authentication providers
 */
import React from 'react';
import { AuthenticationProvider } from '@axa-fr/react-oidc-context';
import { EnvironmentProvider } from 'App/Environment';

const oidc = {
  isEnabled: true,
  client_id: '0123456',
  redirect_uri: 'http://localhost:3000/authentication/callback',
  response_type: 'code',
  post_logout_redirect_uri: 'http://localhost:3000/logout',
  scope: 'openid profile email',
  authority: 'https://autority/',
  silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
  automaticSilentRenew: true,
  loadUserInfo: true,
  triggerAuthFlow: true,
};

export default Component => props => (
  <EnvironmentProvider value={{ environment: { oidc } }}>
    <AuthenticationProvider configuration={oidc} isEnabled>
      <Component {...props} />
    </AuthenticationProvider>
  </EnvironmentProvider>
);
