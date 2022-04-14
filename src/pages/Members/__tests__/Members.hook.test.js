import { renderHook, act } from '@testing-library/react-hooks';
import { computeInfos, useMembers, setPaging, setOnChangePaging, setNumberPages, setCurrentPage } from '../Members.hook';
import { membersMock } from './Members.mock';

describe('setCurrentPage', () => {
  it.each`
    max          | skip         | expected
    ${undefined} | ${undefined} | ${1}
    ${null}      | ${null}      | ${1}
    ${0}         | ${1}         | ${1}
    ${1}         | ${1}         | ${1}
    ${10}        | ${1}         | ${1}
    ${1}         | ${10}        | ${10}
  `('Should return exoected: $expected when max: $max, skip: $skip', ({ max, skip, expected }) => {
    const result = setCurrentPage({ max, skip });
    expect(result).toEqual(expected);
  });
});

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

describe('computeInfos', () => {
  it('Should computed members when computeInfos have been called with members', () => {
    const computedMembers = computeInfos({
      members: membersMock,
    });

    expect(computedMembers[0].birthdate).toEqual({ label: '20/10/1985' });
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

describe('useMembers', () => {
  const defaultUseMembersParams = {
    initState: {
      isLoading: true,
      isLoaded: false,
      members: {
        pagination: { total: 0, currentPage: 1, numberPages: 1 },
        data: [],
      },
      anomaly: { members: null },
    },
  };

  it('Should update stateMembers when useMembers called', () => {
    const { result } = renderHook(() => useMembers({}));
    const expected = {
      isLoading: true,
      isLoaded: false,
      members: {
        pagination: { total: 0, currentPage: 1, numberPages: 1 },
        data: [],
      },
      anomaly: { members: null },
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
    });
  });

  it('Should update stateMembers when useMembers called', () => {
    const { result } = renderHook(() => useMembers(defaultUseMembersParams));
    const expected = {
      isLoading: true,
      isLoaded: false,
      members: {
        pagination: { total: 0, currentPage: 1, numberPages: 1 },
        data: [],
      },
      anomaly: { members: null },
      onChangeSorting: result.current.onChangeSorting,
      onChangePaging: result.current.onChangePaging,
      stateSorting: { field: 'firstname', order: 1 },
      stateFormPaging: { numberItems: 50, page: 1 },
    };
    act(() => {
      expect(result.current).toEqual(expected);
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
      isLoading: true,
      isLoaded: false,
      members: {
        pagination: { total: 0, currentPage: 1, numberPages: 1 },
        data: [],
      },
      anomaly: { members: null },
      onChangeSorting: result.current.onChangeSorting,
      onChangePaging: result.current.onChangePaging,
      stateSorting: { field: 'firstname', order: 1 },
      stateFormPaging: { numberItems: 50, page: 1 },
    };

    act(() => {
      expect(result.current).toEqual(expected);
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
