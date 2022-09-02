import { renderHook, act } from '@testing-library/react-hooks';
import { SERVICE_NAME } from '../constants';
import { DownloadLinkEnhanced } from '../SearchMembers';
import { computeInfos, useSearchMembers, computeSuccess, useFormSearchMembers, computeDataQuery, selectComputeData } from '../SearchMembers.hook';

const expectedDataCompute = {
  anomaly: {
    iconName: 'exclamation-sign',
    label: 'Aucun membre ne correspond à votre recherche',
    type: 'info',
  },
  searchMembers: [],
};

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
    cols: {
      firstname: {
        label: 'Samuel',
      },
      lastname: {
        label: 'Gomez',
      },
      _id: {
        label: '00001',
      },
      actions: {
        children: <DownloadLinkEnhanced firstname="Samuel" idKey="00001" lastname="Gomez" />,
        classModifier: 'actions',
      },
    },
  },
];

describe('computeSuccess', () => {
  it('Should return anomaly message when computeSuccess have been called with empty array responseBody', () => {
    const result = computeSuccess({
      responseBody: [],
    });
    const expected = {
      anomaly: { label: 'Aucun membre ne correspond à votre recherche', type: 'info', iconName: 'exclamation-sign' },
      [SERVICE_NAME]: [],
    };

    expect(result).toEqual(expected);
  });

  it('Should return null anomaly message and computed payload when computeSuccess have been called with responseBody', () => {
    const result = computeSuccess({
      responseBody: membersMock,
    });
    const expected = {
      anomaly: null,
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
    const useQueryFnMock = jest.fn().mockReturnValue({
      data: {
        isLoaded: false,
        isLoading: true,
        [SERVICE_NAME]: [],
      },
      isFetching: true,
      anomaly: undefined,
    });
    const { result } = renderHook(() => useSearchMembers({ stateFormSearchMembers: {}, useQueryFn: useQueryFnMock }));
    const expected = {
      isLoaded: false,
      anomaly: undefined,
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
    const useQueryFnMock = jest.fn().mockReturnValue({
      data: {
        isLoaded: false,
        isLoading: false,
        [SERVICE_NAME]: [],
      },
      isFetching: false,
    });
    const { result } = renderHook(() => useSearchMembers({ stateFormSearchMembers, useQueryFn: useQueryFnMock }));
    const expected = {
      isLoaded: false,
      anomaly: undefined,
      isLoading: false,
      [SERVICE_NAME]: [],
    };
    act(() => {
      expect(result.current).toEqual(expected);
    });
  });
});

describe('computeDataQuery', () => {
  const data = { responseBody: [] };
  const computeSuccessFn = jest.fn();
  it('Should called computeSuccess when computeDataQuery is executing', () => {
    computeDataQuery(data, computeSuccessFn);
    expect(computeSuccessFn).toBeCalledWith(data);
  });
  it('Should return data results computed without computeSuccess', () => {
    const result = computeDataQuery(data);
    expect(result).toEqual(expectedDataCompute);
  });
  it('Should return data results computed with computeSuccess', () => {
    const result = computeDataQuery(data, computeSuccess);
    expect(result).toEqual(expectedDataCompute);
  });
});
