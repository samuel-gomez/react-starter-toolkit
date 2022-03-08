import { renderHook, act } from '@testing-library/react-hooks';
import {
  computeInfos,
  dataFetchReducer,
  useSearchMembers,
  setStateSearchMembersLoading,
  setStateSearchMembersSuccess,
  setStateSearchMembersFailure,
  setSearchMembersInit,
  setSearchMembersError,
  setSearchMembersSuccess,
} from '../SearchMembers.hook';
import { FETCH_SEARCHMEMBERS } from '../constants';

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

describe('setStateSearchMembersFailure', () => {
  it('Should return state isLoading: false with anomaly with When called with state and payload', () => {
    const state = { value: '01' };
    const payload = { members: { code: 500 } };
    const result = setStateSearchMembersFailure({ state, payload });
    const expected = {
      value: '01',
      isLoading: false,
      anomaly: { code: 500 },
    };
    expect(result).toEqual(expected);
  });
});

describe('setSearchMembersInit', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_SEARCHMEMBERS_INIT" } When called', () => {
    setSearchMembersInit(dispatchMock)();
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_SEARCHMEMBERS_INIT' });
  });
});

describe('setSearchMembersError', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_SEARCHMEMBERS_FAILURE" } When called with error', () => {
    setSearchMembersError(dispatchMock)('error');
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_SEARCHMEMBERS_FAILURE', payload: 'error' });
  });
});

describe('setSearchMembersSuccess', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_SEARCHMEMBERS_SUCCESS" } When called with response', () => {
    setSearchMembersSuccess(dispatchMock)([]);
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_SEARCHMEMBERS_SUCCESS', payload: [] });
  });
});

describe('setStateSearchMembersLoading', () => {
  it('Should return state isLoading: true When called with state', () => {
    const state = { value: '01' };
    const result = setStateSearchMembersLoading({ state });
    const expected = {
      value: '01',
      isLoading: true,
    };
    expect(result).toEqual(expected);
  });
});

describe('setStateSearchMembersSuccess', () => {
  it('Should return state with computed members When called with state and payload', () => {
    const state = {
      value: '01',
    };
    const payload = {
      members: {
        responseBody: membersMock,
      },
    };
    const result = setStateSearchMembersSuccess({ state, payload });
    const expected = {
      value: '01',
      isLoading: false,
      anomaly: null,
      members: membersMockExpected,
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

describe('dataFetchReducer', () => {
  it('Should return state with isLoading true and is Error false when type = FETCH_SEARCHMEMBERS_INIT', () => {
    const state = {
      value: 'value',
    };
    const type = FETCH_SEARCHMEMBERS.INIT;

    const result = dataFetchReducer(state, { type });
    const expected = {
      value: 'value',
      isLoading: true,
    };
    expect(result).toEqual(expected);
  });

  it('Should return state with isLoading false and is Error true when type = FETCH_SEARCHMEMBERS_FAILURE', () => {
    const state = {
      value: 'value',
    };
    const type = FETCH_SEARCHMEMBERS.FAILURE;

    const result = dataFetchReducer(state, { type, payload: { members: 'error' } });
    const expected = {
      value: 'value',
      isLoading: false,
      anomaly: 'error',
    };
    expect(result).toEqual(expected);
  });

  it('Should return state with isLoading false and is Error false when type = FETCH_SEARCHMEMBERS_SUCCESS', () => {
    const state = {
      value: 'value',
    };
    const type = FETCH_SEARCHMEMBERS.SUCCESS;

    const result = dataFetchReducer(state, {
      type,
      payload: {
        members: {
          responseBody: membersMock,
        },
      },
    });
    const expected = {
      value: 'value',
      isLoading: false,
      anomaly: null,
      members: membersMockExpected,
    };
    expect(result).toEqual(expected);
  });

  it('Should return throw error when type = other', () => {
    const state = {
      value: 'value',
    };

    const type = 'other';
    const result = dataFetchReducer(state, { type });
    expect(result).toEqual({
      value: 'value',
    });
  });
});

describe('useSearchMembers', () => {
  it('Should return stateSearchMembers, stateSearch and submitSearch function when useSearchMembers called', () => {
    const { result } = renderHook(() => useSearchMembers({}));
    const expected = {
      anomaly: null,
      isLoading: false,
      members: [],
      submitSearch: result.current.submitSearch,
      stateSearch: {
        name: '',
      },
    };
    act(() => {
      expect(result.current).toEqual(expected);
    });
  });

  it('Should update stateSearch by "sophie" when submitSearch called with "sophie"', async () => {
    const { result } = renderHook(() => useSearchMembers({}));
    await act(async () => result.current.submitSearch({ name: 'sophie' }));
    expect(result.current.stateSearch).toEqual({
      name: 'sophie',
    });
  });
});
