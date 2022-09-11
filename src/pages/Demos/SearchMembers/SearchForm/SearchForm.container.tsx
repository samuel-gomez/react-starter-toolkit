import setConfirmClassModifier from 'shared/helpers/setConfirmClassModifier';
import { Tfields } from 'shared/helpers/validation.generic';
import SearchForm from './SearchForm';
import { useSearchForm } from './SearchForm.hook';
import { NAME } from './constants';
import { TReturnUseFormSearchMembers } from '../SearchMembers.hook';

type TsetOnSubmitSearchForm = {
  fields: Tfields;
  submitFormSearchMembers: TSearchFormEnhanced['submitFormSearchMembers'];
};

export const setOnSubmitSearchForm =
  ({ fields, submitFormSearchMembers }: TsetOnSubmitSearchForm) =>
  () =>
    submitFormSearchMembers({
      [NAME]: fields[NAME].value,
    });

type TSearchFormEnhanced = {
  submitFormSearchMembers: TReturnUseFormSearchMembers['submitFormSearchMembers'];
  className?: string;
  useSearchFormFn?: typeof useSearchForm;
  setConfirmClassModifierFn?: typeof setConfirmClassModifier;
  setOnSubmitSearchFormFn?: typeof setOnSubmitSearchForm;
  SearchFormCmpt?: typeof SearchForm;
};

export const SearchFormEnhanced = ({
  submitFormSearchMembers,
  className = 'af-filter-inline',
  useSearchFormFn = useSearchForm,
  setConfirmClassModifierFn = setConfirmClassModifier,
  setOnSubmitSearchFormFn = setOnSubmitSearchForm,
  SearchFormCmpt = SearchForm,
  ...rest
}: TSearchFormEnhanced) => {
  const { onChangeSearchForm, fields, hasErrors } = useSearchFormFn({});
  const confirmClassModifier = setConfirmClassModifierFn(hasErrors);
  const onSubmitSearchForm = setOnSubmitSearchFormFn({ submitFormSearchMembers, fields });

  return (
    <SearchFormCmpt<typeof onSubmitSearchForm>
      {...rest}
      className={className}
      fields={fields}
      onChange={onChangeSearchForm}
      confirmClassModifier={confirmClassModifier}
      hasErrors={hasErrors}
      onSubmit={onSubmitSearchForm}
    />
  );
};

export default SearchFormEnhanced;
