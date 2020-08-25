import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { withEnvironment, EnvironmentProvider, fetchEnv, getFileEnv, useEnv } from '.';

const BaseComponent = ({ environment }) => <div>{environment.env}</div>;
const ComponentWithEnvironment = withEnvironment(BaseComponent);

describe('withEnvironment', () => {
  it('Should BaseComponent receive environment props when use withEnvironment HOC and wrapped by EnvironmentProvider', () => {
    const { getByText, asFragment } = render(
      <EnvironmentProvider value={{ environment: { env: 'production' } }}>
        <ComponentWithEnvironment />
      </EnvironmentProvider>,
    );

    expect(getByText('production')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('fetchEnv', () => {
  it('Should Call setEnvState When fetchEnv called', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ json: () => '' });
    const setEnvStateMock = jest.fn();
    const getFileEnvMock = jest.fn();
    await fetchEnv({
      setEnvState: setEnvStateMock,
      fetchFn: fetchMock,
      getFileEnvFn: getFileEnvMock,
    });
    expect(setEnvStateMock).toBeCalledWith({ environment: '' });
  });
});

describe('getFileEnv', () => {
  it('Should return "environment.test.json" When getFileEnv called without argument', () => {
    const result = getFileEnv();
    expect(result).toEqual('environment.test.json');
  });
  it('Should return "environment.json" When getFileEnv called with nodeEnv = "production"', () => {
    const nodeEnv = 'production';
    const result = getFileEnv(nodeEnv);
    expect(result).toEqual('environment.json');
  });
  it('Should return "environment.dev.json" When getFileEnv called with nodeEnv = "development"', () => {
    const nodeEnv = 'development';
    const result = getFileEnv(nodeEnv);
    expect(result).toEqual('environment.development.json');
  });
  it('Should return "environment.otherenv.json" When getFileEnv called with nodeEnv = "otherenv"', () => {
    const nodeEnv = 'otherenv';
    const result = getFileEnv(nodeEnv);
    expect(result).toEqual('environment.otherenv.json');
  });
});

describe('useEnv', () => {
  const fetchEnvMock = jest.fn().mockResolvedValue({ json: () => '' });
  it('Should render and call fetchEnvFn when state environment is null', () => {
    const expectedEnv = { envState: { environment: null } };
    const { result } = renderHook(() => useEnv());
    act(() => {
      expect(result.current).toEqual(expectedEnv);
    });
  });
  it('Should not render and not call fetchEnvFn when state environment is not null', () => {
    const initState = {
      environment: 'not null env',
    };
    const expectedEnv = { envState: { environment: 'not null env' } };
    const { result } = renderHook(() => useEnv(initState, fetchEnvMock));
    act(() => {
      expect(result.current).toEqual(expectedEnv);
    });
    expect(fetchEnvMock).not.toBeCalled();
  });
});
