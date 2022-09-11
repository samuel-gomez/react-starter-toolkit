import { Tfields } from 'shared/helpers/validation.generic';
import { Text, Button, FieldForm, HelpMessage, FieldInput } from '@axa-fr/react-toolkit-all';
import { setConfirmClassModifier } from 'shared/helpers';
import { NAME, LABEL_NAME, PLACEHOLDER_NAME, FORM_SEARCH_MEMBERS, LABEL_SUBMIT, MIN_SEARCH_BY_NAME } from './constants';
import './SearchForm.scss';
import { TReturnUseSearchForm } from './SearchForm.hook';

type TSearchForm<TonSubmit> = {
  className: string;
  hasErrors: boolean;
  fields: Tfields;
  onSubmit: TonSubmit;
  onChange: TReturnUseSearchForm['onChangeSearchForm'];
  confirmClassModifier: ReturnType<typeof setConfirmClassModifier>;
};

const SearchForm = <TonSubmit,>({ className, fields, hasErrors, onSubmit, onChange, confirmClassModifier }: TSearchForm<TonSubmit>) => (
  <form className={className} id={FORM_SEARCH_MEMBERS} name={FORM_SEARCH_MEMBERS} autoComplete="off">
    <div className="af-filter-inline__default af-filter-inline__default--search-distributors">
      <div className="af-filter-inline__field">
        <FieldForm className="col-md-12">
          <FieldInput className="af-form__text">
            <label className="af-form__group-label" htmlFor={NAME}>
              {LABEL_NAME}
            </label>
            <Text {...fields[NAME]} id={NAME} name={NAME} onChange={onChange} placeholder={PLACEHOLDER_NAME} autoComplete="search-name" />
            <HelpMessage message={`Minimum ${MIN_SEARCH_BY_NAME} caractères pour un nom`} />
          </FieldInput>
        </FieldForm>
      </div>
      <Button
        disabled={hasErrors}
        classModifier={`hasiconLeft submit${confirmClassModifier}`}
        type="submit"
        form={FORM_SEARCH_MEMBERS}
        onClick={onSubmit}
      >
        <span className="af-btn__text">{LABEL_SUBMIT}</span>
        <i className="glyphicon glyphicon-search" />
      </Button>
    </div>
  </form>
);

export default SearchForm;
