import { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import EnvironmentProvider, { useEnv, EnvironmentContext, fetchEnv, getFileEnv } from '..';
import type { TEnvironment } from '..';

const BaseWithEnvironment = ({ environment }: { environment?: TEnvironment | null }) => <div>{environment?.apiUrl?.base}</div>;

const BaseUseEnvContext = () => {
  const envProps = useContext(EnvironmentContext);
  return <BaseWithEnvironment {...envProps} />;
};

const useEnvFnMock = jest.fn().mockReturnValue({
  envState: {
    environment: {
      apiUrl: {
        base: 'myApiUrlEnv',
      },
    },
  },
});

const App = () => (
  <EnvironmentProvider useEnvFn={useEnvFnMock}>
    <BaseUseEnvContext />
  </EnvironmentProvider>
);

describe('getFileEnv', () => {
  it('Should return environment.test.json', () => {
    const fileEnv = getFileEnv();
    expect(fileEnv).toEqual('environment.test.json');
  });
  it('Should return environment.dev.json', () => {
    const fileEnv = getFileEnv('dev');
    expect(fileEnv).toEqual('environment.dev.json');
  });
});

describe('Render App with Base have env props', () => {
  it('Should render App with myApiUrlEnv props when call setFetchCustom', () => {
    const { getByText } = render(<App />);
    expect(getByText('myApiUrlEnv')).toBeDefined();
  });
});

describe('useEnv', () => {
  const fetchEnvFn = jest.fn();

  it('Should import file when state environment is null', () => {
    const initStateCt = {
      environment: null,
    };
    const { result } = renderHook(() => useEnv(fetchEnvFn, initStateCt));

    expect(result.current).toEqual({ envState: { environment: null }, setEnvState: result.current.setEnvState });
    expect(fetchEnvFn).toHaveBeenCalled();
  });

  it('Should not import file config when state environment is not null', async () => {
    const API_URL = {
      BASE: '/apiUrl',
    };
    const environment = {
      apiUrl: API_URL,
      fetchConfig: {},
      oidc: {},
    };
    const { result } = renderHook(() => useEnv(fetchEnvFn, { environment }));

    expect(result.current).toEqual({ envState: { environment }, setEnvState: result.current.setEnvState });
  });
});

describe('fetchEnv', () => {
  const resolvedValue = { json: () => ({ data: 'data' }), blob: () => ({ blob: 'blob' }), status: 200 };
  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: 'data' }),
    }),
  ) as jest.Mock;

  const setEnvStateMock = jest.fn();
  const getFileEnvFnMock = jest.fn();

  it('Should getFileEnvFn called and fetchMock called with "/filename" when call fetchEnv', async () => {
    getFileEnvFnMock.mockReturnValue('filename');
    fetchMock.mockResolvedValue(resolvedValue);
    await fetchEnv({ setEnvState: setEnvStateMock, signal: {} as AbortSignal, fetchFn: fetchMock, getFileEnvFn: getFileEnvFnMock });

    expect(getFileEnvFnMock).toBeCalled();
    expect(fetchMock).toBeCalledWith('/filename', { signal: {} });
  });
  it('Should setEnvState called when call fetchEnv', async () => {
    fetchMock.mockResolvedValue(resolvedValue);
    await fetchEnv({ setEnvState: setEnvStateMock, signal: {} as AbortSignal, fetchFn: fetchMock });
    expect(setEnvStateMock).toBeCalled();
  });

  it('Should setEnvState called when call fetchEnv', async () => {
    fetchMock.mockRejectedValue('error');
    try {
      await fetchEnv({ setEnvState: setEnvStateMock, signal: {} as AbortSignal, fetchFn: fetchMock });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
