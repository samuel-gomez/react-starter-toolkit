import { useCallback, useState, useMemo } from 'react';
import { setDate } from 'shared/helpers/formatDate';
import { ASCENDING } from 'shared/components/Table';
import { setDisplay } from 'shared/helpers/formatDataTable';
import { getApi, setInitialState, useFetchData } from 'shared/helpers/fetchHook';
import setAnomalyEmptyItems from 'shared/helpers/setAnomalyEmptyItems';
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

export const setPagination = ({ total, skip, max, setCurrentPageFn = setCurrentPage, setNumberPagesfn = setNumberPages }) => ({
  total: Number(total),
  numberItems: Number(max),
  numberPages: setNumberPagesfn({ total, max }),
  currentPage: setCurrentPageFn({ total, max, skip }),
});

export const computeInfos = ({ members = [], setDateFn = setDate, setDisplayFn = setDisplay }) =>
  members.map(({ _id, firstname, lastname, birthdate, sexe }) => ({
    key: _id,
    ...setDisplayFn({ firstname }),
    ...setDisplayFn({ lastname }),
    ...setDisplayFn({ birthdate: setDateFn({ date: birthdate }) }),
    ...setDisplayFn({ sexe }),
  }));

export const computeSuccess = ({
  responseBody,
  state,
  setAnomalyEmptyItemsFn = setAnomalyEmptyItems,
  computeInfosFn = computeInfos,
  setPaginationFn = setPagination,
}) => ({
  anomaly: {
    [SERVICE_NAME]: setAnomalyEmptyItemsFn(responseBody?.data),
  },
  [SERVICE_NAME]: {
    data: computeInfosFn({ [SERVICE_NAME]: responseBody?.data }),
    pagination: {
      ...state?.pagination,
      ...setPaginationFn(responseBody?.totals),
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

export const useMembers = ({
  initialState = INITIAL_STATE,
  serviceName = SERVICE_NAME,
  initStateSorting = INITIAL_STATE_SORTING,
  initStatePaging = INITIAL_STATE_PAGING,
  getApiFn = getApi,
  useFetchDataFn = useFetchData,
  computeSuccessFn = computeSuccess,
  setOnChangePagingFn = setOnChangePaging,
}) => {
  const [stateSorting, setStateSorting] = useState(initStateSorting);
  const [stateFormPaging, setStateFormPaging] = useState(initStatePaging);

  const { field, order } = stateSorting;
  const { numberItems, page } = stateFormPaging;

  const onChangeSorting = useCallback(sorting => setStateSorting(sorting), []);

  const onChangePaging = useCallback(paging => setOnChangePagingFn({ setStateFormPaging, paging }), [setOnChangePagingFn]);

  const { state } = useFetchDataFn({
    initialState,
    serviceName,
    computeSuccess: computeSuccessFn,
    service: useMemo(
      () => getApiFn(`members?max=${Number(numberItems)}&sort=${field}&dir=${order}&skip=${Number(page * numberItems)}`),
      [field, getApiFn, numberItems, order, page],
    ),
  });

  return { ...state, onChangeSorting, onChangePaging, stateSorting, stateFormPaging };
};
