import Validate from 'mw.validation';
import { MSG_ERROR_FORMAT } from '../constants';

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

type TEvent = {
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

type Tstate = {
  [x: string]: Record<string, unknown>;
};

type TsetEventState = TEvent & {
  state: Tstate;
};

type Trules = Record<string, TinputRules>;

export const setEventState = ({ state, name, viewValue, value, values }: TsetEventState) =>
  ({
    [`${values !== undefined}`]: {
      ...state[name],
      values,
    },
    [`${viewValue !== undefined}`]: {
      ...state[name],
      value,
      viewValue,
    },
  }['true'] || {
    ...state[name],
    value,
  });

export const genericHandleChange = (rules: Trules, state: Tstate, event: TEvent) => {
  if (rules[event.name]) {
    const { viewValue, value, values, errors, name } = event;
    const inputRules = rules[event.name];
    const message = setMessage({ inputRules, viewValue, value, values, errors });
    const eventState = setEventState({ state, name, viewValue, value, values });

    return {
      ...state,
      [event.name]: {
        ...eventState,
        errors,
        message,
      },
    };
  }
  return state;
};

export const computeInitialStateErrorMessage = (state: Tstate, rules: Trules) => {
  let newState = state;
  Object.keys(rules).forEach(propertyName => {
    const input = state[propertyName];
    if (input && input instanceof Object) {
      const event = {
        name: propertyName,
        value: `${input.value}`,
        viewValue: `${input.viewValue}`,
        values: input.values as [],
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

type Tfield = {
  name?: string;
  value?: string | null;
  message: string | null;
  values?: string[] | null;
};

type Tfields = Record<string, Tfield>;

export const getErrorsList = (fields: Tfields) => Object.keys(fields).filter(key => hasErrorMessage(fields[key]));

export const getValuesList = (fields: Tfields) =>
  Object.keys(fields).filter(
    key => fields[key].value !== null && fields[key].value !== '' && fields[key].values !== [] && fields[key].values !== null,
  );
