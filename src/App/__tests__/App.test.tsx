import { render, act } from '@testing-library/react';
import { ReactNode } from 'react';
import App from '../App';

const useOidcUserMock = jest.fn().mockReturnValue({
  oidcUser: {
    name: 'Samuel Gomez',
  },
});

const envMock = {
  oidc: {
    isEnabled: true,
    client_id: 'interactive.public',
    redirect_uri: 'http://localhost:9999/authentication/callback',
    scope: 'openid profile email api offline_access',
    authority: 'https://demo.duendesoftware.com',
  },
  fetchConfig: {},
  apiUrl: {
    base: 'https://react-starter-api.vercel.app/api/',
    github: 'https://raw.githubusercontent.com/',
  },
};

describe('<App/>', () => {
  it('Should render App with default props', async () => {
    const { getByText } = render(<App {...envMock} />);
    await act(() => {
      getByText('Loading');
    });
  });

  const OidcProviderCmpt = jest.fn().mockImplementation(({ children }: { children: ReactNode }) => <>OidcProviderCmpt : {children}</>);
  const OidcSecureCmpt = jest.fn().mockImplementation(({ children }: { children: ReactNode }) => <>OidcSecureCmpt : {children}</>);
  const FetchProviderCmpt = jest.fn().mockImplementation(({ children }: { children: ReactNode }) => <>FetchProviderCmpt : {children}</>);

  const optionalProps = {
    OidcProviderCmpt,
    OidcSecureCmpt,
    FetchProviderCmpt,
    useOidcUserFn: useOidcUserMock,
  };

  it('Should render App with all props and authentication NOT enabled', () => {
    const props = { ...envMock, oidc: { ...envMock.oidc, isEnabled: false } };
    const { getByText } = render(<App {...props} {...optionalProps} />);

    expect(getByText(/FetchProviderCmpt/)).toBeInTheDocument();
  });

  it('Should render App with all props and authentication enabled', async () => {
    const { getByText } = render(<App {...envMock} {...optionalProps} />);

    await act(() => expect(getByText(/OidcProviderCmpt/)).toBeInTheDocument());
    expect(getByText(/OidcSecureCmpt/)).toBeInTheDocument();
    expect(getByText(/FetchProviderCmpt/)).toBeInTheDocument();
  });
});
