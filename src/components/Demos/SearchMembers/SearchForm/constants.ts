import { MSG_REQUIRED, MSG_LENGTH_3 } from 'shared/constants';

export const LABEL_NAME = 'Nom du membre';
export const NAME = 'name';
export const PLACEHOLDER_NAME = 'John Doe';
export const FORM_SEARCH_MEMBERS = 'form-search-members';
export const LABEL_SUBMIT = 'Rechercher';

export const MIN_SEARCH_BY_NAME = 3;

export const rules = {
  required: MSG_REQUIRED,
  minLength: { value: MIN_SEARCH_BY_NAME, message: MSG_LENGTH_3 },
};

export const defaultValues = {
  [NAME]: '',
};

export const modeValidationStrategy = 'onChange';
