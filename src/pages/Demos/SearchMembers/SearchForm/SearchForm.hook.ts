import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import {
  genericHandleChange,
  getErrorsList,
  computeInitialStateErrorMessage,
  getValuesList,
  Tfields,
  TEvent,
} from 'shared/helpers/validation.generic';
import { NAME, rules } from './constants';

/** ************************************************************************************************************************ */
/* STATE FORM SEARCH DISTRIBUTORS  ***************************************************************************************** */
/** ************************************************************************************************************************ */

export const initStateSearchForm = {
  hasErrors: true,
  fields: {
    ...computeInitialStateErrorMessage(
      {
        [NAME]: { name: NAME, value: '', message: null },
      },
      rules,
    ),
  },
};

type TsetOnChangeSearchForm = {
  genericHandleChangeFn?: typeof genericHandleChange;
  getErrorsListFn?: typeof getErrorsList;
  getValuesListFn?: typeof getValuesList;
  event: TEvent;
  fields: Tfields;
  setStateSearchForm: Dispatch<SetStateAction<typeof initStateSearchForm>>;
  stateSearchForm: typeof initStateSearchForm;
};

export const setOnChangeSearchForm = ({
  stateSearchForm,
  setStateSearchForm,
  fields,
  event,
  genericHandleChangeFn = genericHandleChange,
  getErrorsListFn = getErrorsList,
  getValuesListFn = getValuesList,
}: TsetOnChangeSearchForm) => {
  const handleFields = genericHandleChangeFn(rules, fields, event);
  const errors = getErrorsListFn(handleFields);
  const values = getValuesListFn(handleFields);

  setStateSearchForm({
    ...stateSearchForm,
    fields: handleFields,
    hasErrors: !!errors.length || !values.length,
  });
};

export const useSearchForm = ({ initStateSearchFormCt = initStateSearchForm, setOnChangeSearchFormFn = setOnChangeSearchForm }) => {
  const [stateSearchForm, setStateSearchForm] = useState(initStateSearchFormCt);
  const { fields } = stateSearchForm;

  const onChangeSearchForm = useCallback(
    (event: TEvent) => setOnChangeSearchFormFn({ stateSearchForm, setStateSearchForm, fields, event }),
    [fields, setOnChangeSearchFormFn, stateSearchForm],
  );

  return { onChangeSearchForm, ...stateSearchForm };
};

export type TReturnUseSearchForm = ReturnType<typeof useSearchForm>;
