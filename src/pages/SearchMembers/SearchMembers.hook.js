import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { setInitialState } from 'shared/helpers/fetchHook';
import setAnomalyEmptyItems from 'shared/helpers/setAnomalyEmptyItems';
import { SERVICE_NAME } from './constants';
import { DownloadLinkEnhanced } from './SearchMembers';

export const INITIAL_STATE = setInitialState(SERVICE_NAME);

export const INITIAL_STATE_FORM_SEARCH_MEMBERS = {
  name: '',
  hasSubmit: false,
};

export const computeInfos = ({ members = [] }) =>
  members.map(({ _id, firstname, lastname }) => ({
    key: _id,
    cols: {
      firstname: {
        label: firstname,
      },
      lastname: {
        label: lastname,
      },
      _id: {
        label: _id,
      },
      actions: {
        children: <DownloadLinkEnhanced idKey={_id} firstname={firstname} lastname={lastname} />,
        classModifier: 'actions',
      },
    },
  }));

export const useFormSearchMembers = ({ initStateFormSearchMembers = INITIAL_STATE_FORM_SEARCH_MEMBERS }) => {
  const [stateFormSearchMembers, setStateFormSearchMembers] = useState(initStateFormSearchMembers);

  const submitFormSearchMembers = useCallback(electorsFields => {
    setStateFormSearchMembers(prevState => ({ ...prevState, ...electorsFields, hasSubmit: true }));
  }, []);

  return { submitFormSearchMembers, stateFormSearchMembers };
};

export const computeSuccess = ({ responseBody, setAnomalyEmptyItemsFn = setAnomalyEmptyItems, computeInfosFn = computeInfos }) => ({
  anomaly: {
    [SERVICE_NAME]: setAnomalyEmptyItemsFn(responseBody, 'Aucun membre ne correspond à votre recherche'),
  },
  [SERVICE_NAME]: computeInfosFn({ members: responseBody }),
});

export const computeDataQuery = ({ data, computeSuccessFn = computeSuccess }) => {
  const { responseBody } = data;
  const response = computeSuccessFn({ responseBody });
  return response;
};

export const selectComputeData = (data, computeDataQueryFn = computeDataQuery) => computeDataQueryFn({ data });

export const useSearchMembers = ({ stateFormSearchMembers, initialState = INITIAL_STATE, useQueryFn = useQuery }) => {
  const { name = '' } = stateFormSearchMembers;
  const condition = stateFormSearchMembers.hasSubmit;

  const { data, error, isFetching } = useQueryFn([`members/search?name=${name}`], {
    select: selectComputeData,
    enabled: condition,
  });

  const stateQuery = {
    ...initialState,
    ...data,
    isLoading: isFetching,
    anomaly: error,
  };

  return { ...stateQuery };
};
