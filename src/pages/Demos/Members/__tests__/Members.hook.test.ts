import { renderHook, act } from '@testing-library/react-hooks';
import { TCols } from 'shared/components/Table/Body/Body';
import { emptyFunction } from 'shared/testsUtils';
import { SERVICE_NAME } from '../constants';
import {
  computeInfos,
  useMembers,
  setPaging,
  setOnChangePaging,
  setNumberPages,
  setCurrentPage,
  computeSuccess,
  computeDataQuery,
  setPagination,
} from '../Members.hook';
import { membersMock } from './Members.mock';

const totals = {
  total: 1001,
  count: 50,
  skip: 50,
  max: 50,
};

const expectedData = [
  {
    cols: {
      birthdate: {
        label: '20/10/1985',
      },
      firstname: {
        label: 'Samuel',
      },
      lastname: {
        label: 'Gomez',
      },
      sexe: {
        label: 'M',
      },
    },
    key: '99999',
  },
];
const defaultAnomaly = { label: 'Info : Aucune donnée trouvée', type: 'info', iconName: 'exclamation-sign' } || null;

type TsetExpected = {
  anomaly?: typeof defaultAnomaly | null;
  currentPage?: number;
  numberItems?: number;
  numberPages?: number;
  total?: number;
  data?: {
    cols: TCols;
  }[];
};

const setExpected = ({ anomaly = defaultAnomaly, currentPage = 1, numberItems = 1, numberPages = 1, total = 1, data = [] }: TsetExpected) => ({
  anomaly,
  [SERVICE_NAME]: {
    pagination: {
      currentPage,
      numberItems,
      numberPages,
      total,
    },
    data,
  },
});

describe('computeDataQuery', () => {
  const computeSuccessFn = jest.fn();
  it.each`
    data                                 | callWith
    ${undefined}                         | ${{ responseBody: {} }}
    ${{ responseBody: { name: 'sam' } }} | ${{ responseBody: { name: 'sam' } }}
  `('Should return expected: $expected when computeSuccess have neen called with responseBody: $responseBody', ({ data, callWith }) => {
    computeDataQuery(data, computeSuccessFn);
    expect(computeSuccessFn).toHaveBeenCalledWith(callWith);
  });
});

describe('computeSuccess', () => {
  it.each`
    responseBody                     | expected
    ${undefined}                     | ${setExpected({})}
    ${{ data: [] }}                  | ${setExpected({})}
    ${{ data: [], totals }}          | ${setExpected({ currentPage: 1, numberItems: 50, numberPages: 20, total: 1001 })}
    ${{ data: membersMock, totals }} | ${setExpected({ anomaly: null, currentPage: 1, numberItems: 50, numberPages: 20, total: 1001, data: expectedData })}
  `('Should return expected: $expected when computeSuccess have neen called with responseBody: $responseBody', ({ responseBody, expected }) => {
    const result = computeSuccess({ responseBody });
    expect(result).toEqual(expected);
  });
});

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
  it.each`
    max          | total        | expected
    ${undefined} | ${undefined} | ${1}
    ${null}      | ${null}      | ${1}
    ${0}         | ${1}         | ${Infinity}
    ${1}         | ${1}         | ${1}
    ${10}        | ${1}         | ${1}
    ${1}         | ${10}        | ${9}
    ${10}        | ${50}        | ${4}
    ${10}        | ${5}         | ${1}
  `('Should return exoected: $expected when max: $max, total: $total', ({ max, total, expected }) => {
    const result = setNumberPages({ max, total });
    expect(result).toEqual(expected);
  });
});

describe('setNumberPages', () => {
  const defaultExpected = {
    total: 1,
    numberItems: 1,
    numberPages: 1,
    currentPage: 1,
  };
  it.each`
    max          | skip         | total        | expected
    ${undefined} | ${undefined} | ${undefined} | ${defaultExpected}
    ${null}      | ${null}      | ${null}      | ${{ ...defaultExpected, numberItems: 0, total: 0 }}
    ${10}        | ${10}        | ${10}        | ${{ ...defaultExpected, numberItems: 10, total: 10 }}
    ${10}        | ${0}         | ${10}        | ${{ ...defaultExpected, numberItems: 10, total: 10 }}
    ${0}         | ${10}        | ${11}        | ${{ ...defaultExpected, numberItems: 0, numberPages: Infinity, total: 11 }}
    ${10}        | ${10}        | ${0}         | ${{ ...defaultExpected, numberItems: 10, total: 0 }}
    ${30}        | ${5}         | ${200}       | ${{ ...defaultExpected, numberItems: 30, numberPages: 6, total: 200 }}
  `('Should return exoected: $expected when max: $max, skip: $skip, total: $total', ({ max, total, skip, expected }) => {
    const result = setPagination({ total, skip, max });
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

describe('setOnChangePaging', () => {
  it('Should call setStateFormPaging when call setOnChangePaging', () => {
    const setStateFormPagingMock = jest.fn();
    setOnChangePaging({
      setStateFormPaging: setStateFormPagingMock,
      paging: {
        numberItems: 10,
        page: 2,
      },
    });
    expect(setStateFormPagingMock).toBeCalled();
  });
});

describe('computeInfos', () => {
  it('Should computed members when computeInfos have been called with members', () => {
    const computedMembers = computeInfos(membersMock);

    expect(computedMembers[0].cols.birthdate).toEqual({ label: '20/10/1985' });
  });

  it('Should empty array when computeInfos have been called with empty members', () => {
    const computedMembers = computeInfos([]);
    expect(computedMembers).toEqual([]);
  });
});

const useQueryFnMock = jest.fn().mockReturnValue({
  data: {},
  isFetching: true,
  refetch: emptyFunction,
});

const setExpectedUseMembers = ({
  members = [],
  anomaly = undefined,
  field = 'firstname',
  order = 1,
  numberItems = 50,
  page = 1,
  currentPage = 1,
  numberPages = 1,
  total = 0,
  isLoading = true,
}) => ({
  anomaly,
  members,
  sorting: {
    field,
    order,
  },
  stateFormPaging: {
    numberItems,
    page,
  },
  refetch: emptyFunction,
  pagination: {
    currentPage,
    numberPages,
    total,
  },
  isLoading,
});

describe('useMembers', () => {
  it.each`
    expectedValues
    ${{}}
  `('Should return expectedValues: $expectedValues when useMembers have neen called with responseBody: $responseBody', ({ expectedValues }) => {
    const { result } = renderHook(() => useMembers({ useQueryFn: useQueryFnMock }));
    const expected = {
      ...setExpectedUseMembers({ ...expectedValues }),
      onChangeSorting: result.current.onChangeSorting,
      onChangePaging: result.current.onChangePaging,
    };
    act(() => {
      expect(result.current).toEqual(expected);
    });

    act(() => result.current.onChangeSorting({ field: 'name', order: -1 }));
    expect(result.current.sorting).toEqual({ field: 'name', order: -1 });

    act(() =>
      result.current.onChangePaging({
        numberItems: 100,
        page: 5,
      }),
    );
    expect(result.current.stateFormPaging).toEqual({
      numberItems: 100,
      page: 1,
    });
  });
});
