import { renderHook, act } from '@testing-library/react-hooks';
import { SERVICE_NAME } from '../constants';
import { computeInfos, useSearchMembers, computeSuccess, useFormSearchMembers, INITIAL_STATE } from '../SearchMembers.hook';

const membersMock = [
  {
    _id: '00001',
    firstname: 'Samuel',
    lastname: 'Gomez',
    sexe: 'M',
  },
];

const membersMockExpected = [
  {
    key: '00001',
    firstname: {
      label: 'Samuel',
    },
    lastname: {
      label: 'Gomez',
    },
    _id: {
      label: '00001',
    },
  },
];

describe('computeSuccess', () => {
  it('Should return anomaly message when computeSuccess have been called with empty array responseBody', () => {
    const result = computeSuccess({
      responseBody: [],
    });
    const expected = {
      anomaly: {
        [SERVICE_NAME]: { label: 'Aucun membre ne correspond à votre recherche', type: 'info', iconName: 'exclamation-sign' },
      },
      [SERVICE_NAME]: [],
    };

    expect(result).toEqual(expected);
  });

  it('Should return null anomaly message and computed payload when computeSuccess have been called with responseBody', () => {
    const result = computeSuccess({
      responseBody: membersMock,
    });
    const expected = {
      anomaly: {
        [SERVICE_NAME]: null,
      },
      [SERVICE_NAME]: membersMockExpected,
    };

    expect(result).toEqual(expected);
  });
});

describe('computeInfos', () => {
  it('Should computed members when computeInfos have been called with members', () => {
    const computedSearchMembers = computeInfos({
      members: membersMock,
    });

    expect(computedSearchMembers).toEqual(membersMockExpected);
  });

  it('Should empty array when computeInfos have been called with empty members', () => {
    const computedSearchMembers = computeInfos({
      members: [],
    });
    expect(computedSearchMembers).toEqual([]);
  });
  it('Should empty array when computeInfos have been called with no params', () => {
    const computedSearchMembers = computeInfos({});
    expect(computedSearchMembers).toEqual([]);
  });
});

describe('useFormSearchMembers', () => {
  it('Should return stateFormSearchMembers and submitFormSearchMembers function when useFormSearchMembers called', () => {
    const { result } = renderHook(() => useFormSearchMembers({}));
    const expected = {
      stateFormSearchMembers: {
        name: '',
        hasSubmit: false,
      },
      submitFormSearchMembers: result.current.submitFormSearchMembers,
    };
    act(() => {
      expect(result.current).toEqual(expected);
    });
  });

  it('Should update stateFormSearchMembers by "samuel" when submitFormSearchMembers called with name: "samuel"', async () => {
    const { result } = renderHook(() => useFormSearchMembers({}));
    await act(async () => result.current.submitFormSearchMembers({ name: 'samuel' }));
    expect(result.current.stateFormSearchMembers).toEqual({
      name: 'samuel',
      hasSubmit: true,
    });
  });
});

describe('useSearchMembers', () => {
  it('Should return stateSearchMembers, stateSearch and submitSearch function when useSearchMembers called with empty stateFormSearchMembers', () => {
    const { result } = renderHook(() => useSearchMembers({ stateFormSearchMembers: {} }));
    const expected = {
      isLoaded: false,
      anomaly: { [SERVICE_NAME]: null },
      isLoading: true,
      [SERVICE_NAME]: [],
    };
    act(() => {
      expect(result.current).toEqual(expected);
    });
  });

  const stateFormSearchMembers = {
    name: '',
    hasSubmit: false,
  };

  it('Should return stateSearchMembers, stateSearch and submitSearch function when useSearchMembers called', () => {
    const { result } = renderHook(() => useSearchMembers({ stateFormSearchMembers }));
    const expected = {
      isLoaded: false,

      anomaly: { [SERVICE_NAME]: null },
      isLoading: false,
      [SERVICE_NAME]: [],
    };
    act(() => {
      expect(result.current).toEqual(expected);
    });
  });

  it('Should call useFetchDataFn with computed params and condition: true when useSearchMembers called with hasSubmit true', () => {
    const useFetchDataFn = jest.fn();
    const getApiFn = jest.fn().mockReturnValue('get search members service');
    const computeSuccessFn = jest.fn();
    renderHook(() =>
      useSearchMembers({ stateFormSearchMembers: { ...stateFormSearchMembers, hasSubmit: true }, useFetchDataFn, getApiFn, computeSuccessFn }),
    );

    act(() => {
      expect(useFetchDataFn).toHaveBeenCalledWith({
        condition: true,
        initialState: INITIAL_STATE,
        serviceName: SERVICE_NAME,
        service: 'get search members service',
        computeSuccess: computeSuccessFn,
      });
    });
  });
});
