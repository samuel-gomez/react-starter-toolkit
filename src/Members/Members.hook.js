import { useEffect, useReducer, useCallback } from 'react';
import moment from 'moment';
import { get } from 'lodash';
import { NONE } from 'shared/constants';
import fetchData from 'shared/helpers/fetchData';
import findMembers from './Members.service';
import { FETCH_MEMBERS } from './constants';

const initState = {
  isLoading: false,
  members: [],
  anomaly: null,
  sorting: {
    field: '',
    order: NONE,
  },
  filters: {
    numberItems: 10,
    currentPage: 1,
    numberPages: 1,
  },
};

export const computeInfos = ({ members = [], getFn = get, momentFn = moment }) =>
  members.map(member => ({
    ...member,
    birthdate: momentFn(getFn(member, 'birthdate')).format('DD/MM/YYYY'),
  }));

export const setStateMembersLoading = ({ state }) => ({
  ...state,
  isLoading: true,
});

export const setStateMembersSuccess = ({ state, payload, computeInfosFn = computeInfos }) => ({
  ...state,
  isLoading: false,
  members: computeInfosFn({
    members: payload.members.responseBody,
  }),
});

export const setStateMembersFailure = ({ state, payload }) => ({
  ...state,
  isLoading: false,
  anomaly: payload.members,
});

export const setStateMembersOrder = ({ state, payload }) => ({
  ...state,
  sorting: {
    ...state.sorting,
    ...payload,
  },
  isLoading: true,
});

export const dataFetchReducer = (
  state,
  {
    type,
    payload,
    setStateMembersLoadingFn = setStateMembersLoading,
    setStateMembersSuccessFn = setStateMembersSuccess,
    setStateMembersFailureFn = setStateMembersFailure,
    setStateMembersOrderFn = setStateMembersOrder,
  },
) => {
  switch (type) {
    case FETCH_MEMBERS.INIT:
      return setStateMembersLoadingFn({ state });
    case FETCH_MEMBERS.SUCCESS:
      return setStateMembersSuccessFn({ state, payload });
    case FETCH_MEMBERS.ORDER:
      return setStateMembersOrderFn({ state, payload });
    case FETCH_MEMBERS.FAILURE:
      return setStateMembersFailureFn({ state, payload });
    default:
      return state;
  }
};

export const setMembersInit = dispatch => () => dispatch({ type: FETCH_MEMBERS.INIT });
export const setMembersError = dispatch => payload => dispatch({ type: FETCH_MEMBERS.FAILURE, payload });
export const setMembersSuccess = dispatch => payload => dispatch({ type: FETCH_MEMBERS.SUCCESS, payload });
export const setMembersOrder = dispatch => payload => dispatch({ type: FETCH_MEMBERS.ORDER, payload });

export const useMembers = ({
  fetchCustom,
  initStateCt = initState,
  fetchDataFn = fetchData,
  dataFetchReducerFn = dataFetchReducer,
  findMembersFn = findMembers,
  setMembersInitFn = setMembersInit,
  setMembersErrorFn = setMembersError,
  setMembersSuccessFn = setMembersSuccess,
  setMembersOrderFn = setMembersOrder,
}) => {
  const [stateMembers, dispatch] = useReducer(dataFetchReducerFn, initStateCt);
  const {
    sorting: { field, order },
  } = stateMembers;

  const onChangeOrder = useCallback(sorting => setMembersOrderFn(dispatch)(sorting), [setMembersOrderFn]);

  useEffect(() => {
    fetchDataFn({
      fetchCustom,
      setInit: setMembersInitFn(dispatch),
      setError: setMembersErrorFn(dispatch),
      setSuccess: setMembersSuccessFn(dispatch),
      fetchServices: {
        members: {
          service: findMembersFn,
          args: {
            field,
            order,
          },
        },
      },
    });
  }, [fetchCustom, fetchDataFn, field, findMembersFn, order, setMembersErrorFn, setMembersInitFn, setMembersSuccessFn]);

  return { ...stateMembers, onChangeOrder };
};
