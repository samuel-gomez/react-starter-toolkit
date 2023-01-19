import { Controller, UseFormStateReturn, ControllerRenderProps } from 'react-hook-form';
import { Text } from '@axa-fr/react-toolkit-form-input-text';
import Button from '@axa-fr/react-toolkit-button';
import { FieldForm, FieldError, HelpMessage, FieldInput, MessageTypes } from '@axa-fr/react-toolkit-form-core';
import { setConfirmClassModifier } from 'shared/helpers';
import { NAME, LABEL_NAME, PLACEHOLDER_NAME, FORM_SEARCH_MEMBERS, LABEL_SUBMIT, MIN_SEARCH_BY_NAME, rules } from './constants';
import type { FormValues, TReturnTypeSetOnSubmitSearchForm, TUseForm } from './SearchForm.container';

type TSearchForm = {
  className: string;
  hasErrors: boolean;
  onSubmit: TReturnTypeSetOnSubmitSearchForm;
  handleSubmit: TUseForm['handleSubmit'];
  control: TUseForm['control'];
  confirmClassModifier: ReturnType<typeof setConfirmClassModifier>;
};

type TInputCustom = {
  field: ControllerRenderProps<FormValues>;
  formState: UseFormStateReturn<FormValues>;
};

export const onChangeValue =
  (field: ControllerRenderProps<FormValues>) =>
  ({ value }: { value: string }) =>
    field.onChange(value);

export const InputCustom = ({ field, formState }: TInputCustom) => (
  <div className="af-filter-inline__field">
    <FieldForm message={formState.errors[NAME]?.message} forceDisplayMessage className="col-md-12" messageType={MessageTypes.error}>
      <FieldInput className="af-form__text">
        <label className="af-form__group-label" htmlFor={NAME}>
          {LABEL_NAME}
        </label>
        <Text
          {...field}
          id={NAME}
          ref={null}
          placeholder={PLACEHOLDER_NAME}
          autoComplete="search-name"
          onChange={onChangeValue(field)}
          aria-label={NAME}
        />
        <HelpMessage message={`Minimum ${MIN_SEARCH_BY_NAME} caractères pour un nom`} />
      </FieldInput>
      <FieldError />
    </FieldForm>
  </div>
);

const SearchForm = ({ handleSubmit, className, control, onSubmit, confirmClassModifier, hasErrors }: TSearchForm) => (
  <form onSubmit={handleSubmit(onSubmit)} className={className} id={FORM_SEARCH_MEMBERS} name={FORM_SEARCH_MEMBERS} autoComplete="off">
    <div className="af-filter-inline__default af-filter-inline__default--search-distributors">
      <Controller
        name="name"
        control={control}
        rules={rules}
        render={({ field, formState }) => <InputCustom field={field} formState={formState} />}
      />
      <Button disabled={hasErrors} classModifier={`hasiconLeft submit${confirmClassModifier}`} type="submit" form={FORM_SEARCH_MEMBERS}>
        <span className="af-btn__text">{LABEL_SUBMIT}</span>
        <i className="glyphicon glyphicon-search" />
      </Button>
    </div>
  </form>
);

export default SearchForm;
