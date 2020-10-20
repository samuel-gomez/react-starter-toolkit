import { useEffect, useReducer, useCallback, useState } from 'react';
import formatDate from 'shared/helpers/formatDate';
import { ASCENDING } from 'shared/constants';
import fetchData from 'shared/helpers/fetchData';
import findMembers from './Members.service';
import { FETCH_MEMBERS } from './constants';

const initState = {
  isLoading: false,
  members: [],
  anomaly: null,
  pagination: {
    total: 0,
    currentPage: 1,
    numberPages: 1,
  },
};

const initStateSorting = {
  field: 'firstname',
  order: ASCENDING,
};

const initStatePaging = {
  numberItems: 50,
  page: 1,
};

export const setNumberPages = ({ total = 1, max = 1 }) => Math.ceil(max > total ? 1 : Number(total / max) - 1);
export const setCurrentPage = ({ max, skip }) => Number(skip / max) || 1;

export const setPagination = ({ total, skip, max, setCurrentPageFn = setCurrentPage, setNumberPagesfn = setNumberPages }) => ({
  total: Number(total),
  numberItems: Number(max),
  numberPages: setNumberPagesfn({ total, max }),
  currentPage: setCurrentPageFn({ total, max, skip }),
});

export const setAnomalyIfEmpty = items =>
  !items.length ? { label: 'Info : Aucune donnée trouvée', type: 'info', iconName: 'exclamation-sign' } : null;

export const setBirthDate = ({ birthDate, formatDateFn = formatDate }) => (birthDate !== null ? formatDateFn(birthDate) : '');

export const computeInfos = ({ members = [], setBirthDateFn = setBirthDate }) =>
  members.map(member => ({
    ...member,
    birthdate: setBirthDateFn({ birthDate: member?.birthdate }),
  }));

export const setStateMembersLoading = ({ state }) => ({
  ...state,
  isLoading: true,
});

export const setStateMembersSuccess = ({
  state,
  payload,
  computeInfosFn = computeInfos,
  setAnomalyIfEmptyFn = setAnomalyIfEmpty,
  setPaginationFn = setPagination,
}) => ({
  ...state,
  isLoading: false,
  anomaly: setAnomalyIfEmptyFn(payload?.members?.responseBody?.data),
  members: computeInfosFn({
    members: payload?.members?.responseBody?.data,
  }),
  pagination: {
    ...state?.pagination,
    ...setPaginationFn(payload?.members?.responseBody?.totals),
  },
});

export const setStateMembersFailure = ({ state, payload }) => ({
  ...state,
  isLoading: false,
  anomaly: payload.members,
});

export const dataFetchReducer = (
  state,
  {
    type,
    payload,
    setStateMembersLoadingFn = setStateMembersLoading,
    setStateMembersSuccessFn = setStateMembersSuccess,
    setStateMembersFailureFn = setStateMembersFailure,
  },
) => {
  switch (type) {
    case FETCH_MEMBERS.INIT:
      return setStateMembersLoadingFn({ state });
    case FETCH_MEMBERS.SUCCESS:
      return setStateMembersSuccessFn({ state, payload });
    case FETCH_MEMBERS.FAILURE:
      return setStateMembersFailureFn({ state, payload });
    default:
      return state;
  }
};

export const setMembersInit = dispatch => () => dispatch({ type: FETCH_MEMBERS.INIT });
export const setMembersError = dispatch => payload => dispatch({ type: FETCH_MEMBERS.FAILURE, payload });
export const setMembersSuccess = dispatch => payload => dispatch({ type: FETCH_MEMBERS.SUCCESS, payload });

export const useMembers = ({
  fetchCustom,
  initStateCt = initState,
  initStateSortingCt = initStateSorting,
  initStatePagingCt = initStatePaging,
  fetchDataFn = fetchData,
  dataFetchReducerFn = dataFetchReducer,
  findMembersFn = findMembers,
  setMembersInitFn = setMembersInit,
  setMembersErrorFn = setMembersError,
  setMembersSuccessFn = setMembersSuccess,
}) => {
  const [stateMembers, dispatch] = useReducer(dataFetchReducerFn, initStateCt);
  const [stateSorting, setStateSorting] = useState(initStateSortingCt);
  const [stateFormPaging, setStateFormPaging] = useState(initStatePagingCt);

  const { field, order } = stateSorting;
  const { numberItems, page } = stateFormPaging;

  const onChangeSorting = useCallback(sorting => setStateSorting(sorting), []);

  const onChangePaging = useCallback(
    paging =>
      setStateFormPaging(prevPaging =>
        prevPaging?.numberItems !== paging?.numberItems
          ? {
              numberItems: paging?.numberItems,
              page: 1,
            }
          : paging,
      ),
    [],
  );

  useEffect(() => {
    const abortController = new AbortController();

    fetchDataFn({
      fetchCustom,
      setInit: setMembersInitFn(dispatch),
      setError: setMembersErrorFn(dispatch),
      setSuccess: setMembersSuccessFn(dispatch),
      fetchServices: {
        members: {
          service: findMembersFn,
          args: {
            signal: abortController.signal,
            field,
            order,
            max: Number(numberItems),
            skip: Number(page * numberItems),
          },
        },
      },
    });

    return () => {
      abortController.abort();
    };
  }, [fetchCustom, fetchDataFn, field, findMembersFn, order, setMembersErrorFn, setMembersInitFn, setMembersSuccessFn, numberItems, page]);

  return { ...stateMembers, onChangeSorting, stateSorting, onChangePaging, stateFormPaging };
};
