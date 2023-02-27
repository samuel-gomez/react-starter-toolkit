/* eslint-disable react/display-name */
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import FetchProvider from 'providers/FetchProvider';
import UserProvider from 'providers/UserProvider';
import { ReactElement, ReactNode } from 'react';
import { MOCK_API_URL } from '.';

type TMockProvider = {
  [x: string]: Record<string, unknown | number | string> | string;
};

const MockProviders =
  ({ role = '', ...testMock }: TMockProvider) =>
  ({ children }: { children: ReactNode }) => {
    const useOidcAccessTokenFn = jest.fn().mockReturnValue({ accessToken: 'accessToken' });
    const useOidcUserFn = jest.fn().mockReturnValueOnce({ oidcUser: { member_of: [`CN=${role}`], name: 'Samuel Gomez' } });
    return (
      <UserProvider useOidcUserFn={useOidcUserFn}>
        <FetchProvider
          apiUrl={MOCK_API_URL}
          fetchConfig={{
            headers: { testMock: JSON.stringify(testMock) },
          }}
          useOidcAccessTokenFn={useOidcAccessTokenFn}
        >
          <MemoryRouterProvider url="">{children}</MemoryRouterProvider>
        </FetchProvider>
      </UserProvider>
    );
  };

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>, testMock: TMockProvider = { role: '' }) =>
  render(ui, { wrapper: MockProviders(testMock), ...options });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as render };
