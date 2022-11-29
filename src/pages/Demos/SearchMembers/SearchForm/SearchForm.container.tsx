import { useForm, UseFormReturn } from 'react-hook-form';
import setConfirmClassModifier from 'shared/helpers/setConfirmClassModifier';
import SearchForm from './SearchForm';
import { NAME, defaultValues, modeValidationStrategy } from './constants';
import { TReturnUseFormSearchMembers } from '../SearchMembers.hook';

type TsetOnSubmitSearchForm = {
  fields: FormValues;
  submitFormSearchMembers: TSearchFormEnhanced['submitFormSearchMembers'];
};

export const setOnSubmitSearchForm =
  ({ fields, submitFormSearchMembers }: TsetOnSubmitSearchForm) =>
  () =>
    submitFormSearchMembers({
      [NAME]: fields[NAME],
    });

type TSearchFormEnhanced = {
  submitFormSearchMembers: TReturnUseFormSearchMembers['submitFormSearchMembers'];
  className?: string;
  setConfirmClassModifierFn?: typeof setConfirmClassModifier;
  setOnSubmitSearchFormFn?: typeof setOnSubmitSearchForm;
  SearchFormCmpt?: typeof SearchForm;
  useFormFn?: typeof useForm;
};

export type FormValues = {
  [NAME]: string;
};

export type TUseForm = UseFormReturn<FormValues>;

const SearchFormEnhanced = ({
  submitFormSearchMembers,
  className = 'af-filter-inline',
  setConfirmClassModifierFn = setConfirmClassModifier,
  setOnSubmitSearchFormFn = setOnSubmitSearchForm,
  SearchFormCmpt = SearchForm,
  useFormFn = useForm,
  ...rest
}: TSearchFormEnhanced) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useFormFn<FormValues>({
    defaultValues,
    mode: modeValidationStrategy,
  });
  const fields = watch();
  const confirmClassModifier = setConfirmClassModifierFn(!isValid);
  const onSubmitSearchForm = setOnSubmitSearchFormFn({ submitFormSearchMembers, fields });

  return (
    <SearchFormCmpt
      {...rest}
      className={className}
      hasErrors={!isValid}
      confirmClassModifier={confirmClassModifier}
      onSubmit={onSubmitSearchForm}
      handleSubmit={handleSubmit}
      control={control}
    />
  );
};

export default SearchFormEnhanced;
