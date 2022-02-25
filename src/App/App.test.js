import React, { createContext } from 'react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import { render, act, waitFor } from '@testing-library/react';
import App from './App';

const useOidcUserMock = jest.fn().mockReturnValue({
  oidcUser: {
    name: 'Samuel Gomez',
  },
});
const useOidcAccessTokenMock = jest.fn().mockReturnValue({
  accessToken: 'accessTokenfdsfdsqgvqvsqfs',
});

const envMock = {
  baseUrl: '/',
  OidcProviderCmpt: ({ children }) => <>{children}</>,
  OidcSecureCmpt: ({ children }) => <>{children}</>,
  useOidcUserFn: useOidcUserMock,
  useOidcAccessTokenFn: useOidcAccessTokenMock,
};

it('Should render App', () => {
  const { asFragment } = render(<App {...envMock} />, { wrapper: WrapperStaticRouter });
  expect(asFragment()).toMatchSnapshot();
});
