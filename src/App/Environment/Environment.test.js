import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { EnvironmentProvider, useEnv } from '.';

const BaseComponent = ({ environment }) => <div>{environment.env}</div>;

describe('useEnv', () => {
  it('Should import file when state environment is null', async () => {
    const getImportMock = jest.fn().mockImplementation(() => Promise.resolve({ client_id: 'test' }));
    const { result } = renderHook(() => useEnv(getImportMock));

    const expectedEnv = { envState: { environment: { client_id: 'test' } }, setEnvState: result.current.setEnvState };
    await act(async () => {
      expect(result.current).not.toEqual(expectedEnv);
    });
    await act(async () => {
      expect(result.current).toEqual(expectedEnv);
    });
  });
  it('Should not import file config when state environment is not null', () => {
    const { result } = renderHook(() => useEnv(null, { environment: 'not null env' }));
    const expectedEnv = { envState: { environment: 'not null env' }, setEnvState: result.current.setEnvState };

    act(() => {
      result.current.setEnvState({
        environment: 'not null env',
      });
    });

    expect(result.current).toEqual(expectedEnv);
  });
});
