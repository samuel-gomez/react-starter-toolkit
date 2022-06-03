import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import FetchProvider from 'App/FetchProvider';
import UserProvider from 'App/UserProvider';
import { MOCK_API_URL } from '.';

const MockProviders =
  ({ role, ...testMock }) =>
  ({ children }) => {
    const useOidcAccessTokenFn = jest.fn().mockReturnValue({ accessToken: 'accessToken' });
    const useOidcUserFn = jest.fn().mockReturnValueOnce({ oidcUser: { member_of: [`CN=${role}`] } });
    return (
      <UserProvider useOidcUserFn={useOidcUserFn}>
        <FetchProvider
          apiUrl={MOCK_API_URL}
          fetchConfig={{
            headers: { testMock: JSON.stringify(testMock) },
          }}
          useOidcAccessTokenFn={useOidcAccessTokenFn}
        >
          <StaticRouter context={{}}>{children}</StaticRouter>
        </FetchProvider>
      </UserProvider>
    );
  };

const customRender = (ui, options, testMock) => render(ui, { wrapper: MockProviders(testMock), ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
