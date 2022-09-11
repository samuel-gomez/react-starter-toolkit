import Validate from 'mw.validation';
import { MSG_ERROR_FORMAT } from '../constants';
import isEmptyOrNull from './isEmptyOrNull';

type TinputRules = Record<string, unknown>[];

type Tvalidate = {
  ValidateFn?: typeof Validate;
  rules: TinputRules;
  value?: string;
};

export const validate = ({ ValidateFn = Validate, rules, value = '' }: Tvalidate) => {
  const validationResult = ValidateFn.validation.firstError(ValidateFn.validation.validateView(value, rules));
  return validationResult !== null ? validationResult.message : null;
};

export type TEvent = {
  id?: string;
  name: string;
  viewValue?: string;
  value?: string;
  values?: string[];
  errors?: string[];
};

type TsetMessage = Omit<TEvent, 'name'> & {
  validateFn?: typeof validate;
  msgErrorFormatCt?: string;
  inputRules: TinputRules;
};

export const setMessage = ({
  inputRules,
  viewValue,
  value,
  values,
  errors,
  validateFn = validate,
  msgErrorFormatCt = MSG_ERROR_FORMAT,
}: TsetMessage) =>
  ({
    [`${values !== undefined && errors && errors.length > 0}`]: () => msgErrorFormatCt,
    [`${viewValue !== undefined}`]: () => validateFn({ rules: inputRules, value: viewValue }),
    [`${viewValue === undefined && value !== undefined}`]: () => validateFn({ rules: inputRules, value }),
  }['true']?.() || null);

export type Tfields = Record<string, Tfield>;
export type Trules = Record<string, TinputRules>;

type TsetEventState = TEvent & {
  fields: Tfields;
};

type Tfield = {
  name?: string;
  value?: string | null;
  viewValue?: string | null;
  message: string | null;
  values?: string[] | null;
  errors?: string[] | null;
};

export const setEventState = ({ fields, name, viewValue, value, values }: TsetEventState) =>
  ({
    [`${values !== undefined}`]: {
      ...fields[name],
      values,
    },
    [`${viewValue !== undefined}`]: {
      ...fields[name],
      value,
      viewValue,
    },
  }['true'] || {
    ...fields[name],
    value,
  });

export const genericHandleChange = (rules: Trules, fields: Tfields, event: TEvent, isEmptyOrNullFn = isEmptyOrNull) => {
  if (rules[event.name]) {
    const { viewValue, value, values, errors, name } = event;
    const inputRules = rules[event.name];
    const message = setMessage({ inputRules, viewValue, value, values, errors });
    const eventState = setEventState({ fields, name, viewValue, value, values });

    return {
      ...fields,
      [event.name]: {
        ...eventState,
        ...(isEmptyOrNullFn(errors) ? {} : { errors }),
        message,
      },
    };
  }
  return fields;
};

export const computeInitialStateErrorMessage = (fields: Tfields, rules: Trules) => {
  let newState = fields;
  Object.keys(rules).forEach(propertyName => {
    const input = fields[propertyName];
    if (input && input instanceof Object) {
      const event = {
        name: propertyName,
        ...(input.value !== undefined ? { value: `${input.value}` } : {}),
        ...(input.viewValue !== undefined ? { viewValue: `${input.viewValue}` } : {}),
        ...(input.values !== undefined ? { values: input.values as [] } : {}),
      };
      newState = genericHandleChange(rules, newState, event);
    }
  });
  return newState;
};

type ThasErrorMessage = {
  message: string | null;
};

export const hasErrorMessage = ({ message }: ThasErrorMessage) => message !== null;

export const getErrorsList = (fields: Tfields) => Object.keys(fields).filter(key => hasErrorMessage(fields[key]));

export const getValuesList = (fields: Tfields) =>
  Object.keys(fields).filter(key => !isEmptyOrNull(fields[key].value) || !isEmptyOrNull(fields[key].values));
