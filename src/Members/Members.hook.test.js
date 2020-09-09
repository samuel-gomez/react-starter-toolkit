import { renderHook, act } from '@testing-library/react-hooks';
import {
  computeInfos,
  dataFetchReducer,
  useMembers,
  setStateMembersLoading,
  setStateMembersSuccess,
  setStateMembersFailure,
  setMembersInit,
  setMembersError,
  setMembersSuccess
} from './Members.hook';
import { FETCH_MEMBERS } from './constants';

const membersMock = [
  {
    _id: '00001',
    type: 'PP',
    firstname: 'Samuel',
    lastname: 'Gomez',
    birthdate: '1985-10-20T13:44:20.540000',
    created: '2020-10-20T13:44:20.540000',
  },
];

describe('setStateMembersFailure', () => {
  it('Should return state isLoading: false with anomaly with When called with state and payload', () => {
    const state = { value: '01' };
    const payload = { members: { code: 500 } };
    const result = setStateMembersFailure({ state, payload });
    const expected = {
      value: '01',
      isLoading: false,
      anomaly: { code: 500 },
    };
    expect(result).toEqual(expected);
  });
});

describe('setMembersInit', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_MEMBERS_INIT" } When called', () => {
    setMembersInit(dispatchMock)();
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_MEMBERS_INIT' });
  });
});

describe('setMembersError', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_MEMBERS_FAILURE" } When called with error', () => {
    setMembersError(dispatchMock)('error');
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_MEMBERS_FAILURE', payload: 'error' });
  });
});

describe('setMembersSuccess', () => {
  const dispatchMock = jest.fn();
  it('Should dispatch called with { type: "FETCH_MEMBERS_SUCCESS" } When called with response', () => {
    setMembersSuccess(dispatchMock)('response');
    expect(dispatchMock).toBeCalledWith({ type: 'FETCH_MEMBERS_SUCCESS', payload: 'response' });
  });
});


describe('setStateMembersLoading', () => {
  it('Should return state isLoading: true When called with state', () => {
    const state = { value: '01' };
    const result = setStateMembersLoading({ state });
    const expected = {
      value: '01',
      isLoading: true,
    };
    expect(result).toEqual(expected);
  });
});

describe('setStateMembersSuccess', () => {
  it('Should return state with computed members When called with state and payload', () => {
    const state = { value: '01' };
    const payload = {
      members: {
        responseBody: [
          {
            _id: '00001',
            type: 'PP',
            firstname: 'Samuel',
            lastname: 'Gomez',
            birthdate: '1985-10-20T13:44:20.540000',
            created: '2020-10-20T13:44:20.540000',
          },
        ],
      },
    };
    const result = setStateMembersSuccess({ state, payload });
    const expected = {
      value: '01',
      isLoading: false,
      members: [
        {
          _id: '00001',
          type: 'PP',
          firstname: 'Samuel',
          lastname: 'Gomez',
          birthdate: '20/10/1985',
          created: '2020-10-20T13:44:20.540000',
        },
      ],
    };
    expect(result).toEqual(expected);
  });
});


describe('computeInfos', () => {
  it('Should computed members when computeInfos have been called with members', () => {
    const computedMembers = computeInfos({
      members: membersMock,
    });

    expect(computedMembers[0].birthdate).toEqual('20/10/1985');
  });

  it('Should empty array when computeInfos have been called with empty members', () => {
    const computedMembers = computeInfos({
      members: [],
    });
    expect(computedMembers).toEqual([]);
  });
  it('Should empty array when computeInfos have been called with no params', () => {
    const computedMembers = computeInfos({});
    expect(computedMembers).toEqual([]);
  });
});

describe('dataFetchReducer', () => {
  it('Should return state with isLoading true and is Error false when type = FETCH_MEMBERS_INIT', () => {
    const state = {
      value: 'value',
    };
    const type = FETCH_MEMBERS.INIT;

    const result = dataFetchReducer(state, { type });
    const expected = {
      value: 'value',
      isLoading: true,
    };
    expect(result).toEqual(expected);
  });

  it('Should return state with isLoading false and is Error true when type = FETCH_MEMBERS_FAILURE', () => {
    const state = {
      value: 'value',
    };
    const type = FETCH_MEMBERS.FAILURE;

    const result = dataFetchReducer(state, { type, payload: { members: 'error' } });
    const expected = {
      value: 'value',
      isLoading: false,
      anomaly: 'error',
    };
    expect(result).toEqual(expected);
  });

  it('Should return state with isLoading false and is Error false when type = FETCH_MEMBERS_SUCCESS', () => {
    const state = {
      value: 'value',
    };
    const type = FETCH_MEMBERS.SUCCESS;

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
      members: [
        {
          _id: '00001',
          type: 'PP',
          firstname: 'Samuel',
          lastname: 'Gomez',
          birthdate: '20/10/1985',
          created: '2020-10-20T13:44:20.540000',
        },
      ],
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

describe('useMembers', () => {
  const fetchMock = jest.fn();
  const fetchDataMock = jest.fn();
  const dataFetchReducerMock = jest.fn();
  const findMembersMock = jest.fn();

  const defaultUseMembersParams = {
    initStateCt: {
      isLoading: false,
      members: [],
      anomaly: null,
      filters: {
        numberItems: 10,
        currentPage: 1,
        numberPages: 1,
      },
    },
    fetchCustom: fetchMock,
    fetchDataFn: fetchDataMock,
    dataFetchReducerFn: dataFetchReducerMock,
    findMembersFn: findMembersMock,
  };
 
  it('Should update stateMembers when useMembers called', () => {
    const { result } = renderHook(() => useMembers(defaultUseMembersParams));
    const expected = {
      isLoading: false,
      members: [],
      anomaly: null,      
      filters: {
        numberItems: 10,
        currentPage: 1,
        numberPages: 1,
      },
      onChangeOrder: result.current.onChangeOrder,
      stateSorting: {
        field: '',
        order: 'NONE',
      },
    };
    act(() => {
      expect(result.current).toEqual(expected);
      expect(fetchDataMock).toBeCalled();
    });
  });

  it('Should update order state when onChangeOrder called', () => {    
    const { result } = renderHook(() => useMembers(defaultUseMembersParams));
    act(() => result.current.onChangeOrder({ field: 'name', order: 1})); 
    expect(result.current.stateSorting).toEqual({ field: 'name', order: 1});
  });
  it('Should update stateMembers when onChangeOrder called', () => {
    const { result } = renderHook(() => useMembers(defaultUseMembersParams));
    const expected = {
      isLoading: false,
      members: [],
      anomaly: null,
      filters: {
        numberItems: 10,
        currentPage: 1,
        numberPages: 1,
      },
      onChangeOrder: result.current.onChangeOrder,
      stateSorting: {
        field: '',
        order: 'NONE',
      },
    };
    act(() => {
      expect(result.current).toEqual(expected);
      expect(fetchDataMock).toBeCalled();
    });
  });
});
