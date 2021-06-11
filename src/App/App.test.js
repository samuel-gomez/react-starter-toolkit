import React from 'react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import { render, act } from '@testing-library/react';
import App from './App';

const envMock = {
  baseUrl: '/',
  oidc: {
    client_id: 'interactive.public',
    redirect_uri: 'http://localhost:3000/authentication/callback',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:3000/',
    scope: 'openid profile email api offline_access',
    authority: 'https://demo.identityserver.io',
    silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
    automaticSilentRenew: true,
    loadUserInfo: true,
    isEnabled: false,
    client_name: 'client_name',
    grant_types: [''],
    application_type: 'application_type',
    response_types: ['response_type', 'response_type'],
    redirect_uris: ['redirect_uri/callback', 'redirect_uri/authentification/callback', 'redirect_uri/authentication/silent_callback'],
    subject_type: 'public',
    id_token_signed_response_alg: 'id_token_signed_response_alg',
    token_type: 'Bearer',
    iam_reference: 'iam_reference',
    triggerAuthFlow: true,
  },
};
it('Should App render without crashing', async () => {
  await act(async () => {
    const { asFragment } = render(<App {...envMock} />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
