import { useEffect, useReducer, useCallback, useState, useContext } from 'react';
import fetchData from 'shared/helpers/fetchData';
import { FetchContext } from 'App/FetchProvider';
import setAnomalyEmptyItems from 'shared/helpers/setAnomalyEmptyItems';
import findMembers from './SearchMembers.service';
import { FETCH_SEARCHMEMBERS } from './constants';

const initState = {
  isLoading: false,
  members: [],
  anomaly: null,
};

export const initStateSearch = {
  name: '',
};

export const computeInfos = ({ members = [] }) =>
  members.map(({ _id, firstname, lastname }) => ({
    key: _id,
    firstname: {
      label: firstname,
    },
    lastname: {
      label: lastname,
    },
    _id: {
      label: _id,
    },
  }));

export const setStateSearchMembersLoading = ({ state }) => ({
  ...state,
  isLoading: true,
});

export const setStateSearchMembersSuccess = ({ state, payload, setAnomalyEmptyItemsFn = setAnomalyEmptyItems, computeInfosFn = computeInfos }) => ({
  ...state,
  isLoading: false,
  anomaly: setAnomalyEmptyItemsFn(payload?.members?.responseBody),
  members: computeInfosFn({ members: payload?.members?.responseBody }),
});

export const setStateSearchMembersFailure = ({ state, payload }) => ({
  ...state,
  isLoading: false,
  anomaly: payload?.members,
});

export const dataFetchReducer = (
  state,
  {
    type,
    payload,
    setStateSearchMembersLoadingFn = setStateSearchMembersLoading,
    setStateSearchMembersSuccessFn = setStateSearchMembersSuccess,
    setStateSearchMembersFailureFn = setStateSearchMembersFailure,
  },
) => {
  switch (type) {
    case FETCH_SEARCHMEMBERS.INIT:
      return setStateSearchMembersLoadingFn({ state });
    case FETCH_SEARCHMEMBERS.SUCCESS:
      return setStateSearchMembersSuccessFn({ state, payload });
    case FETCH_SEARCHMEMBERS.FAILURE:
      return setStateSearchMembersFailureFn({ state, payload });
    default:
      return state;
  }
};

export const setSearchMembersInit = dispatch => () => dispatch({ type: FETCH_SEARCHMEMBERS.INIT });
export const setSearchMembersError = dispatch => payload => dispatch({ type: FETCH_SEARCHMEMBERS.FAILURE, payload });
export const setSearchMembersSuccess = dispatch => payload => dispatch({ type: FETCH_SEARCHMEMBERS.SUCCESS, payload });

export const useSearchMembers = ({
  initStateCt = initState,
  initStateSearchCt = initStateSearch,
  dataFetchReducerFn = dataFetchReducer,
  fetchDataFn = fetchData,
  setSearchMembersInitFn = setSearchMembersInit,
  setSearchMembersErrorFn = setSearchMembersError,
  setSearchMembersSuccessFn = setSearchMembersSuccess,
  findMembersFn = findMembers,
  FetchContextObj = FetchContext,
}) => {
  const { fetchCustom } = useContext(FetchContextObj);
  const [stateMembers, dispatch] = useReducer(dataFetchReducerFn, initStateCt);
  const [stateSearch, setStateSearch] = useState(initStateSearchCt);

  const submitSearch = useCallback(nameField => {
    setStateSearch(prevState => ({ ...prevState, ...nameField }));
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    if (stateSearch?.name !== '') {
      fetchDataFn({
        fetchCustom,
        setInit: setSearchMembersInitFn(dispatch),
        setError: setSearchMembersErrorFn(dispatch),
        setSuccess: setSearchMembersSuccessFn(dispatch),
        fetchServices: {
          members: {
            service: findMembersFn,
            args: {
              body: stateSearch,
            },
          },
        },
      });
    }
    return () => {
      abortController.abort();
    };
  }, [fetchCustom, fetchDataFn, findMembersFn, setSearchMembersErrorFn, setSearchMembersInitFn, setSearchMembersSuccessFn, stateSearch]);

  return { ...stateMembers, submitSearch, stateSearch };
};
