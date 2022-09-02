import { PropTypes } from 'prop-types';
import setConfirmClassModifier from 'shared/helpers/setConfirmClassModifier';
import SearchForm from './SearchForm';
import { useSearchForm } from './SearchForm.hook';
import { NAME } from './constants';

export const setOnSubmitSearchForm =
  ({ fields, submitSearchForm }) =>
  () =>
    submitSearchForm({
      [NAME]: fields[NAME].value,
    });

export const SearchFormEnhanced = ({
  defaultClassName,
  useSearchFormFn,
  setConfirmClassModifierFn,
  submitSearchForm,
  setOnSubmitSearchFormFn,
  ...rest
}) => {
  const { onChangeSearchForm, stateSearchForm } = useSearchFormFn({});
  const { fields, hasErrors } = stateSearchForm;
  const confirmClassModifier = setConfirmClassModifierFn(hasErrors);
  const onSubmitSearchForm = setOnSubmitSearchFormFn({ submitSearchForm, fields });

  return (
    <SearchForm
      {...rest}
      className={defaultClassName}
      fields={fields}
      onChange={onChangeSearchForm}
      confirmClassModifier={confirmClassModifier}
      hasErrors={hasErrors}
      onSubmit={onSubmitSearchForm}
    />
  );
};

SearchFormEnhanced.propTypes = {
  useSearchFormFn: PropTypes.func,
  setConfirmClassModifierFn: PropTypes.func,
  setOnSubmitSearchFormFn: PropTypes.func,
  defaultClassName: PropTypes.string,
};

SearchFormEnhanced.defaultProps = {
  useSearchFormFn: useSearchForm,
  setConfirmClassModifierFn: setConfirmClassModifier,
  setOnSubmitSearchFormFn: setOnSubmitSearchForm,
  defaultClassName: 'af-filter-inline',
};

export default SearchFormEnhanced;
