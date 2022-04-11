import { createContext } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { emptyFunction } from 'shared/testsUtils';
import { TIMEOUT } from 'shared/constants';
import {
  setInitialState,
  loading,
  failure,
  success,
  reducer,
  setLoading,
  setError,
  setSuccess,
  setClear,
  useFetchData,
  LOADING,
  FAILURE,
  SUCCESS,
  postApi,
  putApi,
  getApi,
  setBodyArgs,
  CLEAR,
  setAnomalyWithAbort,
  fnsFetchData,
} from './fetchHook';

const state = { value: '01' };
const serviceName = 'myservice';

describe('setBodyArgs', () => {
  it('Should return body object when body not null', () => {
    const result = setBodyArgs({ name: 'name' });
    expect(result).toEqual({ body: { name: 'name' } });
  });
  it('Should return empty object when body null', () => {
    const result = setBodyArgs(null);
    expect(result).toEqual({});
  });
});

describe('setInitialState', () => {
  it('Should return initial state when called with service name', () => {
    const result = setInitialState(serviceName);
    const expected = {
      isLoading: false,
      isLoaded: false,
      [serviceName]: [],
      anomaly: {
        [serviceName]: null,
      },
    };
    expect(result).toEqual(expected);
  });
});

describe('setState loading', () => {
  it('Should return state isLoading: true when called with state', () => {
    const result = loading({ state });
    const expected = {
      ...state,
      isLoading: true,
    };
    expect(result).toEqual(expected);
  });
});

describe('setState failure', () => {
  it('Should return state isLoading: false with anomaly with when called with state serviceName and payload', () => {
    const payload = { [serviceName]: { code: 500 } };
    const result = failure({ state, payload, serviceName });
    const expected = {
      ...state,
      isLoading: false,
      anomaly: { [serviceName]: { code: 500 } },
    };
    expect(result).toEqual(expected);
  });
});

const mockSuccessResponse = [
  {
    id: '00001',
    name: 'Samuel',
  },
];

const payloadSuccess = {
  [serviceName]: {
    responseBody: mockSuccessResponse,
  },
};

describe('setState success', () => {
  it('Should return state with serviceName data when called with state and payload response body', () => {
    const result = success({ state, payload: payloadSuccess, serviceName });
    const expected = {
      ...state,
      isLoading: false,
      isLoaded: true,
      [serviceName]: mockSuccessResponse,
    };
    expect(result).toEqual(expected);
  });
});

describe('setAnomalyWithAbort', () => {
  it('Should return error aborted message when anomaly is an abort', () => {
    const payload = {
      message: 'DOMException: The user aborted a request.',
    };
    const result = setAnomalyWithAbort({ payload, serviceName });
    const expected = {
      code: 500,
      label: 'Erreur: la requête a mis trop de temps',
    };
    expect(result).toEqual(expected);
  });
  it('Should return normal error when anomaly is not an abort', () => {
    const payload = {
      [serviceName]: {
        anomaly: 'anomaly',
      },
    };
    const result = setAnomalyWithAbort({ payload, serviceName });
    const expected = {
      anomaly: 'anomaly',
    };
    expect(result).toEqual(expected);
  });
});

describe('dispatch functions', () => {
  const dispatchMock = jest.fn();
  it.each`
    functionCalled | calledWith
    ${setClear}    | ${{ type: CLEAR }}
    ${setLoading}  | ${{ type: LOADING }}
    ${setError}    | ${{ type: FAILURE }}
    ${setSuccess}  | ${{ type: SUCCESS }}
  `('Should dispatch called with $calledWith when $functionCalled is called', ({ functionCalled, calledWith }) => {
    functionCalled(dispatchMock)();
    expect(dispatchMock).toBeCalledWith(calledWith);
  });
});

describe('reducer', () => {
  const reducerMock = reducer({ serviceName });
  it.each`
    type         | payload                       | expected
    ${undefined} | ${null}                       | ${{ ...state }}
    ${null}      | ${null}                       | ${{ ...state }}
    ${LOADING}   | ${null}                       | ${{ ...state, isLoading: true }}
    ${FAILURE}   | ${{ [serviceName]: 'error' }} | ${{ ...state, isLoading: false, anomaly: { [serviceName]: 'error' } }}
    ${SUCCESS}   | ${payloadSuccess}             | ${{ ...state, isLoading: false, [serviceName]: mockSuccessResponse, isLoaded: true }}
    ${CLEAR}     | ${'payload'}                  | ${'payload'}
  `(`Should return expected : $expected when called with type : $type and payload : $payload`, ({ type, payload, expected }) => {
    const result = reducerMock(state, { type, payload });
    expect(result).toEqual(expected);
  });
});

describe('useFetchData', () => {
  const serviceMock = jest.fn();
  const fetchDataMock = jest.fn();
  const fetchMock = jest.fn();
  const dispatchMock = jest.fn();
  const setLoadingMock = jest.fn();
  const setErrorMock = jest.fn();
  const setSuccessMock = jest.fn();
  const FetchContextMock = createContext({ fetchCustom: fetchMock });

  const defaultProps = {
    service: serviceMock,
    serviceName,
    initialState: {
      isLoading: false,
      [serviceName]: [],
      anomaly: {
        [serviceName]: null,
      },
    },
    computeSuccess: emptyFunction,
    FetchContextObj: FetchContextMock,
    fns: {
      ...fnsFetchData,
      setLoading: setLoadingMock,
      setError: setErrorMock,
      setSuccess: setSuccessMock,
      fetchData: fetchDataMock,
    },
  };
  it('Should return initial state when useFetchData called with default props', () => {
    const { result } = renderHook(() => useFetchData({ ...defaultProps, condition: false }));
    const expected = {
      clearState: result.current.clearState,
      state: {
        anomaly: {
          [serviceName]: null,
        },
        isLoading: false,
        [serviceName]: [],
      },
    };
    act(() => {
      expect(result.current).toEqual(expected);
    });
  });

  it('Should call fetchData when useFetchData called with default props and condition true', () => {
    renderHook(() => useFetchData(defaultProps));
    const abortController = new AbortController();
    act(() => {
      expect(fetchDataMock).toBeCalledWith({
        fetchCustom: fetchMock,
        setLoading: setLoadingMock(dispatchMock),
        setError: setErrorMock(dispatchMock),
        setSuccess: setSuccessMock(dispatchMock),
        fetchServices: {
          [serviceName]: {
            service: serviceMock,
            args: {
              signal: abortController.signal,
            },
          },
        },
        callbackSuccess: null,
      });
    });
  });

  it('Should cancel fetchData when timeout is over', () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    jest.useFakeTimers();
    renderHook(() => useFetchData(defaultProps));
    act(() => {
      jest.advanceTimersByTime(TIMEOUT + 1000);
    });
    expect(abortSpy).toHaveBeenCalled();
  });
});

describe('Services', () => {
  const fetchCustomMock = jest.fn();

  it('putApi', () => {
    putApi('path')({ fetchCustom: fetchCustomMock, signal: 'abort' });
    expect(fetchCustomMock).toBeCalledWith('path', {
      method: 'PUT',
      signal: 'abort',
      body: '{}',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('postApi', () => {
    postApi('path')({ fetchCustom: fetchCustomMock, signal: 'abort' });
    expect(fetchCustomMock).toBeCalledWith('path', {
      method: 'POST',
      signal: 'abort',
      body: '{}',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('getApi', () => {
    getApi('path')({ fetchCustom: fetchCustomMock, signal: 'abort' });
    expect(fetchCustomMock).toBeCalledWith('path', {
      signal: 'abort',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
