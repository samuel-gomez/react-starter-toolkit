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
  setMembersSuccess,
  setPaging,
  setOnChangePaging,
  setAnomalyIfEmpty,
  setNumberPages,
  setBirthDate,
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

describe('setNumberPages', () => {
  it('Should return 0 when max = 1 and total = 1', () => {
    const result = setNumberPages({});
    expect(result).toEqual(1);
  });
  it('Should return 5 when max = 10 and total = 50', () => {
    const result = setNumberPages({ max: 10, total: 50 });
    expect(result).toEqual(4);
  });
  it('Should return 1 when max = 10 and total = 5', () => {
    const result = setNumberPages({ max: 10, total: 5 });
    expect(result).toEqual(1);
  });
});

describe('setBirthDate', () => {
  it('Should return empty string when date null', () => {
    const result = setBirthDate({ birthDate: null });
    expect(result).toEqual('');
  });
  it('Should return formatted date when technical date', () => {
    const result = setBirthDate({ birthDate: '1983-03-30T00:00:00' });
    expect(result).toEqual('30/03/1983');
  });
});

describe('setAnomalyIfEmpty', () => {
  it('Should return null when receive items not empty', () => {
    const result = setAnomalyIfEmpty(['item']);
    expect(result).toBeNull();
  });
  it('Should  when receive items not empty', () => {
    const result = setAnomalyIfEmpty([]);
    const expected = { label: 'Info : Aucune donnée trouvée', type: 'info', iconName: 'exclamation-sign' };
    expect(result).toEqual(expected);
  });
});
describe('setPaging', () => {
  it('Should return paging with same page number when numberItems not changing', () => {
    const result = setPaging({ numberItems: 50, page: 2 })({ numberItems: 50 });
    expect(result).toEqual({ numberItems: 50, page: 2 });
  });
  it('Should return new paging with page one when numberItems had changing', () => {
    const result = setPaging({ numberItems: 50, page: 2 })({ numberItems: 10 });
    expect(result).toEqual({ numberItems: 50, page: 1 });
  });
});

describe('setStateFormPaging', () => {
  it('Should call setStateFormPaging when call setOnChangePaging', () => {
    const setStateFormPagingMock = jest.fn();
    setOnChangePaging({ setStateFormPaging: setStateFormPagingMock, paging: {} });
    expect(setStateFormPagingMock).toBeCalled();
  });
});

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
        responseBody: {
          data: [
            {
              _id: '00001',
              type: 'PP',
              firstname: 'Samuel',
              lastname: 'Gomez',
              birthdate: '1985-10-20T13:44:20.540000',
              created: '2020-10-20T13:44:20.540000',
            },
          ],
          totals: 50,
        },
      },
    };
    const result = setStateMembersSuccess({ state, payload });
    const expected = {
      value: '01',
      isLoading: false,
      anomaly: null,
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
      pagination: {
        currentPage: 1,
        numberItems: NaN,
        numberPages: 1,
        total: NaN,
      },
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
          responseBody: { data: membersMock, totals: 50 },
        },
      },
    });
    const expected = {
      value: 'value',
      isLoading: false,
      anomaly: null,
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
      pagination: {
        currentPage: 1,
        numberItems: NaN,
        numberPages: 1,
        total: NaN,
      },
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
      onChangeSorting: result.current.onChangeSorting,
      stateSorting: {
        field: 'firstname',
        order: 1,
      },
      onChangePaging: result.current.onChangePaging,
      stateFormPaging: {
        numberItems: 50,
        page: 1,
      },
    };
    act(() => {
      expect(result.current).toEqual(expected);
      expect(fetchDataMock).toBeCalled();
    });
  });

  it('Should update order state when onChangeSorting called', () => {
    const { result } = renderHook(() => useMembers(defaultUseMembersParams));
    act(() => result.current.onChangeSorting({ field: 'name', order: 1 }));
    expect(result.current.stateSorting).toEqual({ field: 'name', order: 1 });
  });
  it('Should update stateMembers when onChangeSorting called', () => {
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
      onChangeSorting: result.current.onChangeSorting,
      stateSorting: {
        field: 'firstname',
        order: 1,
      },
      onChangePaging: result.current.onChangePaging,
      stateFormPaging: {
        numberItems: 50,
        page: 1,
      },
    };
    act(() => {
      expect(result.current).toEqual(expected);
      expect(fetchDataMock).toBeCalled();
    });
  });

  it('Should update order state when onChangePaging called', () => {
    const { result } = renderHook(() => useMembers(defaultUseMembersParams));
    act(() =>
      result.current.onChangePaging({
        numberItems: 100,
      }),
    );
    expect(result.current.stateFormPaging).toEqual({
      numberItems: 100,
      page: 1,
    });
  });
});
