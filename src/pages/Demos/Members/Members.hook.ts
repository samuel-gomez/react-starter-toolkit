import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ASCENDING, setDisplay, Torder } from 'shared/components/Table';
import { Tanomaly } from 'shared/types';
import { setAnomalyEmptyItems, setDate } from 'shared/helpers';
import { SERVICE_NAME } from './constants';

export const DEFAULT_STATE_VALUE = {
  pagination: {
    total: 0,
    currentPage: 1,
    numberPages: 1,
  },
  data: [],
};

export const INITIAL_STATE_SORTING = {
  field: 'firstname',
  order: ASCENDING as Torder,
};

export const INITIAL_STATE_PAGING = {
  numberItems: 50,
  page: 1,
};

export const setNumberPages = ({ total = 1, max = 1 }) => Math.ceil(max >= total ? 1 : Number(total / max) - 1);
export const setCurrentPage = ({ max, skip }: { max: number; skip: number }) => (+max !== 0 && Math.ceil(Number(skip / max))) || 1;

export const setPagination = ({ total = 1, skip = 1, max = 1, setCurrentPageFn = setCurrentPage, setNumberPagesfn = setNumberPages }) => ({
  total: Number(total),
  numberItems: Number(max),
  numberPages: setNumberPagesfn({ total, max }),
  currentPage: setCurrentPageFn({ max, skip }),
});

export const computeInfos = <T extends Record<string, string>[]>(data: T, setDateFn = setDate, setDisplayFn = setDisplay) =>
  data.map(({ _id, firstname, lastname, birthdate, sexe }) => ({
    key: _id,
    cols: {
      ...setDisplayFn({ firstname }),
      ...setDisplayFn({ lastname }),
      ...setDisplayFn({ birthdate: setDateFn({ date: birthdate as string }) }),
      ...setDisplayFn({ sexe }),
    },
  }));

type TcomputeSuccess = {
  setAnomalyEmptyItemsFn?: typeof setAnomalyEmptyItems;
  computeInfosFn?: typeof computeInfos;
  setPaginationFn?: typeof setPagination;
  responseBody: {
    data?: Record<string, string>[];
    totals?: {
      total: number;
      count: number;
      skip: number;
      max: number;
    };
  };
};

export const computeSuccess = ({
  responseBody,
  setAnomalyEmptyItemsFn = setAnomalyEmptyItems,
  computeInfosFn = computeInfos,
  setPaginationFn = setPagination,
}: TcomputeSuccess) => ({
  anomaly: setAnomalyEmptyItemsFn(responseBody?.data),
  [SERVICE_NAME]: {
    data: computeInfosFn(responseBody?.data ?? []),
    pagination: {
      ...setPaginationFn(responseBody?.totals ?? {}),
    },
  },
});

export const setPaging = (paging: typeof INITIAL_STATE_PAGING) => (prevPaging: Partial<typeof INITIAL_STATE_PAGING>) =>
  prevPaging?.numberItems !== paging?.numberItems
    ? {
        numberItems: paging?.numberItems,
        page: 1,
      }
    : paging;

type TsetState<Tstate> = Dispatch<SetStateAction<Tstate>>;

type TsetOnChangePaging = {
  setStateFormPaging: TsetState<typeof INITIAL_STATE_PAGING>;
  paging: typeof INITIAL_STATE_PAGING;
  setPagingFn?: typeof setPaging;
};

export const setOnChangePaging = ({ setStateFormPaging, paging, setPagingFn = setPaging }: TsetOnChangePaging) => {
  setStateFormPaging(setPagingFn(paging));
};

export const computeDataQuery = (data: { responseBody: TcomputeSuccess['responseBody'] } = { responseBody: {} }, computeSuccessFn = computeSuccess) =>
  computeSuccessFn({ ...data });

type TuseMembers = {
  initStateSorting?: Omit<typeof INITIAL_STATE_SORTING, 'order'> & { order: Torder };
  initStatePaging?: typeof INITIAL_STATE_PAGING;
  computeDataQueryFn?: typeof computeDataQuery;
  setOnChangePagingFn?: typeof setOnChangePaging;
  useQueryFn?: typeof useQuery;
};

export const useMembers = ({
  initStateSorting = INITIAL_STATE_SORTING,
  initStatePaging = INITIAL_STATE_PAGING,
  computeDataQueryFn = computeDataQuery,
  setOnChangePagingFn = setOnChangePaging,
  useQueryFn = useQuery,
}: TuseMembers) => {
  const [stateSorting, setStateSorting] = useState(initStateSorting);
  const [stateFormPaging, setStateFormPaging] = useState(initStatePaging);

  const { field, order } = stateSorting;
  const { numberItems, page } = stateFormPaging;

  const onChangeSorting = useCallback((sorting: typeof INITIAL_STATE_SORTING) => setStateSorting(sorting), []);

  const onChangePaging = useCallback(
    (paging: typeof INITIAL_STATE_PAGING) => setOnChangePagingFn({ setStateFormPaging, paging }),
    [setOnChangePagingFn],
  );

  const { data, isFetching, error, refetch } = useQueryFn(
    [`members?max=${Number(numberItems)}&sort=${field}&dir=${order}&skip=${Number(page * numberItems)}`],
    {
      select: computeDataQueryFn,
    },
  );

  return {
    members: data?.members?.data ?? DEFAULT_STATE_VALUE.data,
    pagination: data?.members?.pagination ?? DEFAULT_STATE_VALUE.pagination,
    anomaly: (error || data?.anomaly) as Tanomaly | null,
    isLoading: isFetching,
    refetch,
    onChangeSorting,
    onChangePaging,
    sorting: stateSorting,
    stateFormPaging,
  };
};

export type TReturnUseMembers = ReturnType<typeof useMembers>;
