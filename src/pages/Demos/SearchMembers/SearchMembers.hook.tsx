import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { setAnomalyEmptyItems } from 'shared/helpers';
import { Tanomaly } from 'shared/types';
import { SERVICE_NAME } from './constants';
import { DownloadLinkEnhanced } from './SearchMembers';

export const computeInfos = ({ members }: { members?: Record<string, string>[] }) =>
  members?.map(({ _id, firstname, lastname }) => ({
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
  })) ?? [];

export const INITIAL_STATE_FORM_SEARCH_MEMBERS = {
  name: '',
  hasSubmit: false,
};

export const useFormSearchMembers = ({ initStateFormSearchMembers = INITIAL_STATE_FORM_SEARCH_MEMBERS }) => {
  const [stateFormSearchMembers, setStateFormSearchMembers] = useState(initStateFormSearchMembers);

  const submitFormSearchMembers = useCallback((electorsFields: Record<string, string | boolean | undefined | null>) => {
    setStateFormSearchMembers(prevState => ({ ...prevState, ...electorsFields, hasSubmit: true }));
  }, []);

  return { submitFormSearchMembers, stateFormSearchMembers };
};

export type TReturnUseFormSearchMembers = ReturnType<typeof useFormSearchMembers>;

type TcomputeSuccess = {
  setAnomalyEmptyItemsFn?: typeof setAnomalyEmptyItems;
  computeInfosFn?: typeof computeInfos;
  responseBody: Record<string, string>[];
};

export const computeSuccess = ({ responseBody, setAnomalyEmptyItemsFn = setAnomalyEmptyItems, computeInfosFn = computeInfos }: TcomputeSuccess) => ({
  anomaly: setAnomalyEmptyItemsFn(responseBody, 'Aucun membre ne correspond à votre recherche'),
  [SERVICE_NAME]: computeInfosFn({ members: responseBody }),
});

type Tdata = { responseBody: TcomputeSuccess['responseBody'] };

export const computeDataQuery = (data: Tdata, computeSuccessFn = computeSuccess) => computeSuccessFn({ ...data });

type TuseSearchMembers = {
  useQueryFn?: typeof useQuery;
  stateFormSearchMembers: typeof INITIAL_STATE_FORM_SEARCH_MEMBERS;
};

export const useSearchMembers = ({ stateFormSearchMembers, useQueryFn = useQuery }: TuseSearchMembers) => {
  const { name, hasSubmit } = stateFormSearchMembers;

  const { data, error, isFetching } = useQueryFn([`members/search?name=${name}`], {
    select: computeDataQuery,
    enabled: hasSubmit,
  });

  return {
    ...data,
    anomaly: (error || data?.anomaly) as Tanomaly | null,
    isLoading: isFetching,
  };
};

export type TReturnUseSearchMembers = ReturnType<typeof useSearchMembers>;
