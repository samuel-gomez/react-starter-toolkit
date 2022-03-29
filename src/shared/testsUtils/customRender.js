import React from 'react';
import { render } from '@testing-library/react';
import FetchProvider from 'App/FetchProvider';

const API_URL = 'https://react-starter-toolkit-api.netlify.app/api/';

const MockProviders =
  testMock =>
  ({ children }) => {
    const useOidcAccessToken = jest.fn().mockReturnValue({ accessToken: 'accessToken' });
    return (
      <FetchProvider
        apiUrl={API_URL}
        fetchConfig={{
          headers: { testMock: JSON.stringify(testMock) },
        }}
        useOidcAccessToken={useOidcAccessToken}
      >
        {children}
      </FetchProvider>
    );
  };

const customRender = (ui, options, testMock) => render(ui, { wrapper: MockProviders(testMock), ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
