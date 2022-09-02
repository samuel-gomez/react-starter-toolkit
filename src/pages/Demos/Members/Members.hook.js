import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ASCENDING, setDisplay } from 'shared/components/Table';
import { setInitialState } from 'App/FetchProvider';
import { setAnomalyEmptyItems, setDate } from 'shared/helpers';
import { SERVICE_NAME } from './constants';

export const INITIAL_STATE = setInitialState(SERVICE_NAME, {
  pagination: {
    total: 0,
    currentPage: 1,
    numberPages: 1,
  },
  data: [],
});

const INITIAL_STATE_SORTING = {
  field: 'firstname',
  order: ASCENDING,
};

const INITIAL_STATE_PAGING = {
  numberItems: 50,
  page: 1,
};

export const setNumberPages = ({ total = 1, max = 1 }) => Math.ceil(max >= total ? 1 : Number(total / max) - 1);
export const setCurrentPage = ({ max, skip }) => (+max !== 0 && Math.ceil(Number(skip / max))) || 1;

export const setPagination = ({ total = 1, skip = 1, max = 1, setCurrentPageFn = setCurrentPage, setNumberPagesfn = setNumberPages }) => ({
  total: Number(total),
  numberItems: Number(max),
  numberPages: setNumberPagesfn({ total, max }),
  currentPage: setCurrentPageFn({ total, max, skip }),
});

export const computeInfos = ({ members = [], setDateFn = setDate, setDisplayFn = setDisplay }) =>
  members.map(({ _id, firstname, lastname, birthdate, sexe }) => ({
    key: _id,
    cols: {
      ...setDisplayFn({ firstname }),
      ...setDisplayFn({ lastname }),
      ...setDisplayFn({ birthdate: setDateFn({ date: birthdate }) }),
      ...setDisplayFn({ sexe }),
    },
  }));

export const computeSuccess = ({
  responseBody,
  state = INITIAL_STATE,
  setAnomalyEmptyItemsFn = setAnomalyEmptyItems,
  computeInfosFn = computeInfos,
  setPaginationFn = setPagination,
}) => ({
  anomaly: setAnomalyEmptyItemsFn(responseBody?.data),
  [SERVICE_NAME]: {
    data: computeInfosFn({ [SERVICE_NAME]: responseBody?.data }),
    pagination: {
      ...state?.pagination,
      ...setPaginationFn(responseBody?.totals ?? { ...INITIAL_STATE.pagination }),
    },
  },
});

export const setPaging = paging => prevPaging =>
  prevPaging?.numberItems !== paging?.numberItems
    ? {
        numberItems: paging?.numberItems,
        page: 1,
      }
    : paging;

export const setOnChangePaging = ({ setStateFormPaging, paging, setPagingFn = setPaging }) => {
  setStateFormPaging(setPagingFn(paging));
};

export const computeDataQuery = ({ data, computeSuccessFn = computeSuccess }) => {
  const { responseBody } = data;
  const response = computeSuccessFn({ responseBody });
  return response;
};

export const useMembers = ({
  initialState = INITIAL_STATE,
  initStateSorting = INITIAL_STATE_SORTING,
  initStatePaging = INITIAL_STATE_PAGING,
  computeDataQueryFn = computeDataQuery,
  setOnChangePagingFn = setOnChangePaging,
  useQueryFn = useQuery,
}) => {
  const [stateSorting, setStateSorting] = useState(initStateSorting);
  const [stateFormPaging, setStateFormPaging] = useState(initStatePaging);

  const { field, order } = stateSorting;
  const { numberItems, page } = stateFormPaging;

  const onChangeSorting = useCallback(sorting => setStateSorting(sorting), []);

  const onChangePaging = useCallback(paging => setOnChangePagingFn({ setStateFormPaging, paging }), [setOnChangePagingFn]);

  const { data, isFetching, error, refetch } = useQueryFn(
    [`members?max=${Number(numberItems)}&sort=${field}&dir=${order}&skip=${Number(page * numberItems)}`],
    {
      select: data => computeDataQueryFn({ data }),
    },
  );

  const stateQuery = {
    ...initialState,
    ...data,
    anomaly: error || data?.anomaly,
    isLoading: isFetching,
    refetch,
  };

  return { ...stateQuery, onChangeSorting, onChangePaging, stateSorting, stateFormPaging };
};
