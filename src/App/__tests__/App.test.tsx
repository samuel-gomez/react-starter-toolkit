import { render, act } from '@testing-library/react';
import { ReactNode } from 'react';
import App from '../App';

const useOidcUserMock = jest.fn().mockReturnValue({
  oidcUser: {
    name: 'Samuel Gomez',
  },
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
    const OidcProviderCmpt = jest.fn().mockImplementation(({ children }: { children: ReactNode }) => <>OidcProviderCmpt : {children}</>);
    const OidcSecureCmpt = jest.fn().mockImplementation(({ children }: { children: ReactNode }) => <>OidcSecureCmpt : {children}</>);
    const FetchProviderCmpt = jest.fn().mockImplementation(({ children }: { children: ReactNode }) => <>FetchProviderCmpt : {children}</>);

    const optionalProps = {
      OidcProviderCmpt,
      OidcSecureCmpt,
      FetchProviderCmpt,
      useOidcUserFn: useOidcUserMock,
    };
    const { asFragment, getByText } = render(<App {...envMock} {...optionalProps} />);

    await act(() => expect(getByText(/OidcProviderCmpt/)).toBeInTheDocument());
    expect(getByText(/OidcSecureCmpt/)).toBeInTheDocument();
    expect(getByText(/FetchProviderCmpt/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
