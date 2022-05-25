import { render, act } from '@testing-library/react';
import { ReactNode } from 'react';
import App from '../App';

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
  oidc: {
    isEnabled: true,
    client_id: 'interactive.public',
    redirect_uri: 'http://localhost:9999/authentication/callback',
    scope: 'openid profile email api offline_access',
    authority: 'https://demo.duendesoftware.com',
  },
  fetchConfig: {},
  apiUrl: '/apiUrl',
};

describe('<App/>', () => {
  it('Should render App with default props', async () => {
    const { asFragment, getByText } = render(<App {...envMock} />);
    await act(() => {
      getByText('Loading');
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render App with all props', async () => {
    const optionalProps = {
      OidcProviderCmpt: ({ children }: { children: ReactNode }) => <>OidcProviderCmpt : {children}</>,
      OidcSecureCmpt: ({ children }: { children: ReactNode }) => <>OidcSecureCmpt : {children}</>,
      useOidcUserFn: useOidcUserMock,
      useOidcAccessTokenFn: useOidcAccessTokenMock,
    };
    const { asFragment, getByText } = render(<App {...envMock} {...optionalProps} />);

    expect(getByText(/OidcProviderCmpt/)).toBeInTheDocument();
    expect(getByText(/OidcSecureCmpt/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
