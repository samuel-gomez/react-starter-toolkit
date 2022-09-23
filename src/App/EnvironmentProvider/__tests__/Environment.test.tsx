import { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import EnvironmentProvider, { useEnv, EnvironmentContext, fetchEnv } from '..';
import type { TEnvironment } from '..';

const BaseWithEnvironment = ({ environment }: { environment?: TEnvironment | null }) => <div>{environment?.baseUrl}</div>;

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
  const fetchEnvFn = jest.fn();
  it('Should import file when state environment is null', () => {
    const initStateCt = {
      environment: null,
    };
    const { result } = renderHook(() => useEnv(fetchEnvFn, initStateCt));

    expect(result.current).toEqual({ envState: { environment: null }, setEnvState: result.current.setEnvState });
    expect(fetchEnvFn).toHaveBeenCalled();
  });
  it('Should not import file config when state environment is not null', () => {
    const environment = {
      apiUrl: '/api',
      baseUrl: '/',
      fetchConfig: {},
      oidc: {},
    };
    const { result } = renderHook(() => useEnv(fetchEnvFn, { environment }));

    expect(result.current).toEqual({ envState: { environment }, setEnvState: result.current.setEnvState });
    expect(fetchEnvFn).not.toHaveBeenCalled();
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

/* describe('useEnv', () => {
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
}); */
