import Validate from 'mw.validation';
import { MSG_ERROR_FORMAT } from '../constants';

export const validate = ({ ValidateFn = Validate, rules, value }) => {
  const validationResult = ValidateFn.validation.firstError(ValidateFn.validation.validateView(value, rules));
  return validationResult !== null ? validationResult.message : null;
};

export const setMessage = ({ inputRules, viewValue, value, values, errors, validateFn = validate, msgErrorFormatCt = MSG_ERROR_FORMAT }) =>
  ({
    [values !== undefined && errors && errors.length > 0]: msgErrorFormatCt,
    [viewValue !== undefined]: validateFn({ rules: inputRules, value: viewValue }),
    [viewValue === undefined && value !== undefined]: validate({ rules: inputRules, value }),
  }.true || null);

export const setEventState = ({ state, event, viewValue, value, values }) =>
  ({
    [values !== undefined]: {
      ...state[event.name],
      ...event,
    },
    [viewValue !== undefined]: {
      ...state[event.name],
      value,
      viewValue,
    },
  }.true || {
    ...state[event.name],
    value,
  });

export const genericHandleChange = (rules, state, event) => {
  if (rules[event.name]) {
    const { viewValue, value, values, errors } = event;
    const inputRules = rules[event.name];
    const message = setMessage({ inputRules, viewValue, value, values, errors });
    const eventState = setEventState({ state, event, message, viewValue, value, values });
    return {
      ...state,
      [event.name]: {
        ...eventState,
        message,
      },
    };
  }
  return state;
};

export const computeInitialStateErrorMessage = (state, rules) => {
  let newState = state;
  Object.keys(rules).forEach(propertyName => {
    const input = state[propertyName];
    if (input && input instanceof Object) {
      const event = {
        name: propertyName,
        value: input.value,
        viewValue: input.viewValue,
        values: input.values,
      };
      newState = genericHandleChange(rules, newState, event);
    }
  });
  return newState;
};

export const hasErrorMessage = key => fields => fields[key].message !== null;

export const getErrorsList = fields => Object.keys(fields).filter(key => hasErrorMessage(key)(fields));

export const getValuesList = fields => Object.keys(fields).filter(key => fields[key].value !== null && fields[key].value !== '' && fields[key].values !== '' && fields[key].values !== null);
