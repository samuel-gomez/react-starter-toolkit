import { useContext } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import EnvironmentProvider, { useEnv, EnvironmentContext } from '..';
import type { TEnvironment, TEnvironmentState } from '..';

const BaseWithEnvironment = ({ environment }: { environment: TEnvironment | null }) => <div>{environment?.baseUrl}</div>;

const BaseUseEnvContext = () => {
  const envProps = useContext(EnvironmentContext);
  return <BaseWithEnvironment {...envProps} />;
};

const useEnvFnMock = jest.fn().mockReturnValue({
  envState: {
    environment: {
      baseUrl: 'urllocal',
    },
  },
});

const App = () => (
  <EnvironmentProvider useEnvFn={useEnvFnMock}>
    <BaseUseEnvContext />
  </EnvironmentProvider>
);

describe('Render App with Base have env props', () => {
  it('Should render App baseUrl props when call setFetchCustom', () => {
    const { asFragment, getByText } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('urllocal')).toBeDefined();
  });
});

describe('useEnv', () => {
  it('Should import file when state environment is null', async () => {
    const getImportMock = jest.fn().mockImplementation(() => Promise.resolve({ client_id: 'test' }));
    const { result } = renderHook(() => useEnv(getImportMock));

    const expectedEnv = { envState: { environment: { client_id: 'test' }, error: null }, setEnvState: result.current.setEnvState };

    await act(async () => {
      expect(result.current).not.toEqual(expectedEnv);
    });
    expect(result.current).toEqual(expectedEnv);
  });

  it('Should not import file config when state environment is not null', () => {
    const environmentMock: TEnvironment = {
      oidc: { client_id: 'interactive.public' },
      fetchConfig: { method: 'GET' },
      apiUrl: 'url',
      baseUrl: 'url',
    };

    const mockEnv: TEnvironmentState = { environment: environmentMock, error: null };
    const { result } = renderHook(() => useEnv(() => Promise.resolve(), mockEnv));
    const expectedEnv = { envState: mockEnv, setEnvState: result.current.setEnvState };

    act(() => {
      result.current.setEnvState({
        environment: environmentMock,
        error: null,
      });
    });

    expect(result.current).toEqual(expectedEnv);
  });
});
