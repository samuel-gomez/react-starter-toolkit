import { useEffect, useReducer } from 'react';
import moment from 'moment';
import { get, orderBy } from 'lodash';
import fetchData from 'shared/helpers/fetchData';
import findMembers from './Members.service';
import { FETCH_MEMBERS_INIT, FETCH_MEMBERS_SUCCESS, FETCH_MEMBERS_FAILURE } from './constants';

export const computeInfos = ({ members = [], getFn = get, momentFn = moment }) =>
  members.map(member => ({
    ...member,
    birthdate: momentFn(getFn(member, 'birthdate')).format('DD/MM/YYYY'),
  }));

export const setStateMembersLoading = ({ state }) => ({
  ...state,
  isLoading: true,
});

export const setStateMembersSuccess = ({ state, payload, computeInfosFn = computeInfos, orderByFn = orderBy }) => ({
  ...state,
  isLoading: false,
  members: computeInfosFn({
    members: orderByFn(payload.members.responseBody, ['created'], ['desc']),
  }),
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
    case FETCH_MEMBERS_INIT:
      return setStateMembersLoadingFn({ state });
    case FETCH_MEMBERS_SUCCESS:
      return setStateMembersSuccessFn({ state, payload });
    case FETCH_MEMBERS_FAILURE:
      return setStateMembersFailureFn({ state, payload });
    default:
      return state;
  }
};

export const setMembersInit = dispatch => () => dispatch({ type: FETCH_MEMBERS_INIT });
export const setMembersError = dispatch => payload => dispatch({ type: FETCH_MEMBERS_FAILURE, payload });
export const setMembersSuccess = dispatch => payload => dispatch({ type: FETCH_MEMBERS_SUCCESS, payload });

export const useMembers = ({
  initState,
  fetchCustom,
  fetchDataFn = fetchData,
  dataFetchReducerFn = dataFetchReducer,
  findMembersFn = findMembers,
  setMembersInitFn = setMembersInit,
  setMembersErrorFn = setMembersError,
  setMembersSuccessFn = setMembersSuccess,
}) => {
  const [stateMembers, dispatch] = useReducer(dataFetchReducerFn, initState);

  useEffect(() => {
    fetchDataFn({
      fetchCustom,
      setInit: setMembersInitFn(dispatch),
      setError: setMembersErrorFn(dispatch),
      setSuccess: setMembersSuccessFn(dispatch),
      fetchServices: {
        members: {
          service: findMembersFn,
        },
      },
    });
  }, [fetchCustom, fetchDataFn, findMembersFn, setMembersErrorFn, setMembersInitFn, setMembersSuccessFn]);

  return { ...stateMembers };
};
