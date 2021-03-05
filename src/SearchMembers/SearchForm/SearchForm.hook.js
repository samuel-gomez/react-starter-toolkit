import { useState, useCallback } from 'react';
import { genericHandleChange, getErrorsList, computeInitialStateErrorMessage, getValuesList } from 'shared/helpers/validation.generic';
import rules from './SearchForm.validation.rules';
import { NAME } from './constants';

/** ************************************************************************************************************************ */
/* STATE FORM SEARCH DISTRIBUTORS  ***************************************************************************************** */
/** ************************************************************************************************************************ */

export const initStateSearchForm = computeInitialStateErrorMessage(
  {
    hasErrors: true,
    fields: {
      [NAME]: { name: NAME, value: '', message: null },
    },
  },
  rules,
);

export const setOnChangeSearchForm = ({
  stateSearchForm,
  setStateSearchForm,
  fields,
  event,
  genericHandleChangeFn = genericHandleChange,
  getErrorsListFn = getErrorsList,
  getValuesListFn = getValuesList,
}) => {
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

  const onChangeSearchForm = useCallback(event => setOnChangeSearchFormFn({ stateSearchForm, setStateSearchForm, fields, event }), [
    fields,
    setOnChangeSearchFormFn,
    stateSearchForm,
  ]);

  return { onChangeSearchForm, stateSearchForm };
};
