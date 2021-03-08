import { MSG_FORMAT } from 'shared/constants';

export const LABEL_NAME = 'Nom du membre';
export const NAME = 'name';
export const PLACEHOLDER_NAME = 'John Doe';
export const FORM_SEARCH_MEMBERS = 'form-search-members';
export const LABEL_SUBMIT = 'Rechercher';

export const MIN_SEARCH_BY_NAME = 3;

export const regExp = /^[\w\s-]{3,}$/;

export const rulePatternName = {
  pattern: {
    regex: regExp,
    message: MSG_FORMAT,
  },
};
