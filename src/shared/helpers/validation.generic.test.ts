import {
  validate,
  genericHandleChange,
  computeInitialStateErrorMessage,
  hasErrorMessage,
  getErrorsList,
  getValuesList,
  setMessage,
} from './validation.generic';

import { MSG_ERROR_FORMAT, MSG_REQUIRED } from '../constants';

const rulesRequired = {
  required: {
    message: MSG_REQUIRED,
  },
};

const MSG_ERROR_DATE = 'La date est invalide';

const FIELDS = {
  firstname: {},
  agent: {},
  contract: {
    maxLength: {
      maxLength: 8,
      message: 'Le champ contient trop de caractères',
    },
    pattern: { regex: {}, message: 'Veuillez saisir un nombre' },
  },
  lastname: {},
  birthdate: { date: { message: MSG_ERROR_DATE } },
  begin: { date: { message: MSG_ERROR_DATE } },
};

const setAllRules = (fields: Record<string, Record<string, unknown>>) =>
  Object.entries(fields).reduce((acc, curr) => {
    const res = Object.entries(curr[1]).map(currRule => ({ [currRule[0]]: currRule[1] }), []);

    return {
      ...acc,
      [curr[0]]: [...res, rulesRequired],
    };
  }, {});

const rules = setAllRules(FIELDS);

describe('setMessage', () => {
  const validateFn = jest.fn();
  it.each`
    inputRules   | viewValue       | value        | values       | errors       | mockReturnValue       | expected
    ${undefined} | ${undefined}    | ${undefined} | ${undefined} | ${undefined} | ${undefined}          | ${null}
    ${undefined} | ${undefined}    | ${undefined} | ${[]}        | ${undefined} | ${undefined}          | ${null}
    ${undefined} | ${undefined}    | ${undefined} | ${[]}        | ${['error']} | ${undefined}          | ${MSG_ERROR_FORMAT}
    ${['rule']}  | ${'01/01/2022'} | ${undefined} | ${undefined} | ${undefined} | ${'viewValueMessage'} | ${'viewValueMessage'}
    ${['rule']}  | ${undefined}    | ${'text'}    | ${undefined} | ${undefined} | ${'valueMessage'}     | ${'valueMessage'}
  `(
    'Should return expected: $expected when inputRules: $inputRules, viewValue: $viewValue, value: $value, values: $values, errors: $errors',
    ({ inputRules, viewValue, value, values, errors, mockReturnValue, expected }) => {
      validateFn.mockReturnValue(mockReturnValue);

      const result = setMessage({
        inputRules,
        viewValue,
        value,
        values,
        errors,
        validateFn,
      });
      expect(result).toEqual(expected);

      if (viewValue !== undefined) {
        expect(validateFn).toHaveBeenCalledWith({
          rules: inputRules,
          value: viewValue,
        });
      } else if (viewValue === undefined && value !== undefined) {
        expect(validateFn).toHaveBeenCalledWith({
          rules: inputRules,
          value,
        });
      } else {
        expect(validateFn).not.toHaveBeenCalled();
      }
    },
  );
});

describe('validate', () => {
  const expectedMessage = 'this is this first error';
  const firstError = jest.fn();
  const validateView = jest.fn();
  const ValidateFn = {
    validation: {
      firstError,
      validateView,
      add: jest.fn(),
      validateModel: jest.fn(),
      validateDependencies: jest.fn(),
    },
    objectValidation: {
      validateModel: jest.fn(),
      getFunctions: jest.fn(),
      getFunctionsResult: jest.fn(),
    },
  };

  it.each`
    value        | rules              | firstErrorValue                 | validateViewValue | expected
    ${undefined} | ${undefined}       | ${null}                         | ${[]}             | ${null}
    ${'myvalue'} | ${[rulesRequired]} | ${null}                         | ${[]}             | ${null}
    ${12345678}  | ${[rulesRequired]} | ${null}                         | ${[]}             | ${null}
    ${''}        | ${[rulesRequired]} | ${{ message: expectedMessage }} | ${[]}             | ${expectedMessage}
  `(
    'Should return expected: $expected when value: $value, rules: $rules, firstErrorValue: $firstErrorValue, validateViewValue: $validateViewValue',
    ({ value, rules, firstErrorValue, validateViewValue, expected }) => {
      firstError.mockReturnValue(firstErrorValue);
      validateView.mockReturnValue(validateViewValue);

      const result = validate({ rules, value, ValidateFn });

      expect(result).toEqual(expected);
    },
  );
});

describe('genericHandleChange', () => {
  type TsetRules = {
    key?: string;
    message?: string;
  };
  const setRules = ({ key = '', message }: TsetRules) => ({
    [key]: [{ required: { message } }],
  });

  type TState = {
    key?: string;
    name?: string;
    value?: string;
    viewValue?: string;
    values?: string[];
    message?: string | null;
  };
  const setState = ({ name, value, values, viewValue, message = null, key = '' }: TState) => ({
    [key]: {
      name,
      value,
      message,
      values,
      viewValue,
    },
  });

  type TsetGivenEvent = Omit<TState, 'key' | 'message'> & {
    errors?: string[];
    viewValue?: string;
  };
  const setGivenEvent = ({ value, values, viewValue, errors, name = '' }: TsetGivenEvent) => ({
    value,
    values,
    errors,
    name,
    viewValue,
  });

  it.each`
    message             | key          | name         | stateValue   | eventValue             | eventViewValue         | stateValues              | eventValues              | errors       | expectedValue          | expectedViewValue      | expectedValues           | expectedName | expectedMessage
    ${undefined}        | ${undefined} | ${undefined} | ${undefined} | ${undefined}           | ${undefined}           | ${undefined}             | ${undefined}             | ${undefined} | ${undefined}           | ${undefined}           | ${undefined}             | ${undefined} | ${null}
    ${MSG_ERROR_FORMAT} | ${'agent'}   | ${'agent'}   | ${undefined} | ${undefined}           | ${undefined}           | ${['Guillaume Chervet']} | ${['Guillaume Chervet']} | ${['error']} | ${undefined}           | ${undefined}           | ${['Guillaume Chervet']} | ${'agent'}   | ${MSG_ERROR_FORMAT}
    ${undefined}        | ${'agent'}   | ${'agent'}   | ${undefined} | ${undefined}           | ${undefined}           | ${['Guillaume Chervet']} | ${['Guillaume Chervet']} | ${['error']} | ${undefined}           | ${undefined}           | ${['Guillaume Chervet']} | ${'agent'}   | ${MSG_ERROR_FORMAT}
    ${MSG_REQUIRED}     | ${'agent'}   | ${'agent'}   | ${undefined} | ${undefined}           | ${undefined}           | ${['']}                  | ${['Guillaume Chervet']} | ${[]}        | ${undefined}           | ${undefined}           | ${['Guillaume Chervet']} | ${'agent'}   | ${null}
    ${MSG_REQUIRED}     | ${'agent'}   | ${'agent'}   | ${''}        | ${'guillaume_chervet'} | ${'Guillaume Chervet'} | ${undefined}             | ${undefined}             | ${[]}        | ${'guillaume_chervet'} | ${'Guillaume Chervet'} | ${undefined}             | ${'agent'}   | ${null}
  `(
    'Should return expectedViewValue: $expectedViewValue, expectedValues: $expectedValues, expectedValue: $expectedValue, expectedName: $expectedName and expectedMessage: $expectedMessage when message: $message, key: $key, name: $name, stateValue: $stateValue, eventValue: $eventValue, stateValues: $stateValues, eventValues: $eventValues, errors: $errors, eventViewValue: $eventViewValue',
    ({
      message,
      key,
      name,
      stateValue,
      eventValue,
      eventViewValue,
      stateValues,
      eventValues,
      errors,
      expectedViewValue,
      expectedName,
      expectedMessage,
      expectedValue,
      expectedValues,
    }) => {
      const rules = setRules({ key, message });
      const givenState = setState({ key, name, value: stateValue, values: stateValues });
      const givenEvent = setGivenEvent({ name, errors, value: eventValue, values: eventValues, viewValue: eventViewValue });
      const result = genericHandleChange(rules, givenState, givenEvent);
      expect(result).toMatchObject(
        setState({
          key,
          name: expectedName,
          value: expectedValue,
          message: expectedMessage,
          values: expectedValues,
          viewValue: expectedViewValue,
        }),
      );
    },
  );

  type TsetGivenStateField = {
    name?: string;
    message?: string;
    value?: string | null;
    [x: string]: unknown;
  };
  const setGivenStateField = ({ name = '', message = MSG_REQUIRED, value = '', ...others }: TsetGivenStateField) => ({
    [name]: { name, message, value, ...others },
  });

  const state = {
    ...setGivenStateField({ name: 'firstname' }),
    ...setGivenStateField({ name: 'agent' }),
    ...setGivenStateField({ name: 'lastname' }),
    ...setGivenStateField({ name: 'contract' }),
    ...setGivenStateField({ name: 'birthdate', value: null, viewValue: '' }),
    ...setGivenStateField({ name: 'begin', value: null, viewValue: '' }),
  };

  it('Should change the state when a field changed with one text change', () => {
    const givenEvent = {
      value: 'Martin',
      name: 'lastname',
      id: 'cjv3mxouh00063h5qzj5bw1xw',
    };
    const expectedState = {
      ...state,
      lastname: { message: null, name: 'lastname', value: 'Martin' },
    };

    const result = genericHandleChange(rules, state, givenEvent);
    expect(result).toMatchObject(expectedState);
  });

  it('Should change the state when a field changed with multiple changes', () => {
    const givenEvent = {
      values: ['Guillaume Chervet'],
      errors: ['error'],
      name: 'agent',
      id: 'agent',
    };
    const expectedState = {
      ...state,
      agent: {
        message: MSG_ERROR_FORMAT,
        name: 'agent',
        values: ['Guillaume Chervet'],
      },
    };

    const result = genericHandleChange(rules, state, givenEvent);
    expect(result).toMatchObject(expectedState);
  });

  it('Should change the state when a date field had a changed', () => {
    const givenEvent = {
      value: '2019-05-02T22:00:00.000Z',
      viewValue: '03/05/2019',
      name: 'birthdate',
      id: 'cjv6b2led000t3h5qe3e2ryzl',
    };
    const expectedState = {
      ...state,
      birthdate: {
        message: null,
        name: 'birthdate',
        value: '2019-05-02T22:00:00.000Z',
        viewValue: '03/05/2019',
      },
    };

    const result = genericHandleChange(rules, state, givenEvent);
    expect(result).toMatchObject(expectedState);
  });

  it('Should not change the state if the rule is unknown', () => {
    const unknownRules = {
      unknown: [{ required: { message: 'Le champs est obligatoire' } }],
    };

    const givenEvent = {
      value: '2019-05-02T22:00:00.000Z',
      viewValue: '03/05/2019',
      name: 'birthdate',
      id: 'cjv6b2led000t3h5qe3e2ryzl',
    };

    const result = genericHandleChange(unknownRules, state, givenEvent);
    expect(result).toMatchObject(state);
  });
});

describe('computeInitialStateErrorMessage', () => {
  const setGivenState = (customState: { value?: string; values?: string[]; viewValue?: string }) => ({
    firstname: { name: 'firstname', message: null, ...customState },
  });

  it.each`
    givenState                                  | rules    | expectedState
    ${setGivenState({ value: 'françois' })}     | ${rules} | ${{ firstname: { name: 'firstname', message: null, value: 'françois' } }}
    ${setGivenState({ values: ['françois'] })}  | ${rules} | ${{ firstname: { name: 'firstname', message: null, values: ['françois'] } }}
    ${setGivenState({ viewValue: 'François' })} | ${rules} | ${{ firstname: { name: 'firstname', message: null, viewValue: 'François' } }}
  `('Should return expectedState: $expectedState when givenState: $givenState, rules: $rules', ({ givenState, expectedState }) => {
    const result = computeInitialStateErrorMessage(givenState, rules);
    expect(result).toEqual(expectedState);
  });
});

describe('hasErrorMessage', () => {
  it.each`
    message    | expected
    ${'hello'} | ${true}
    ${null}    | ${false}
  `('Should return expected: $expected when message: $message', ({ message, expected }) => {
    const result = hasErrorMessage({ message });
    expect(result).toEqual(expected);
  });
});

describe('getErrorsList', () => {
  it.each`
    lastname | firstname | birthdate | expected
    ${'doe'} | ${'john'} | ${null}   | ${['lastname', 'firstname']}
    ${null}  | ${null}   | ${null}   | ${[]}
  `(
    'Should return expected: $expected when messages have lastname: $lastname, firstname: $firstname, birthdate: $birthdate',
    ({ lastname, firstname, birthdate, expected }) => {
      const fields = {
        lastname: {
          message: lastname,
        },
        firstname: {
          message: firstname,
        },
        birthdate: {
          message: birthdate,
        },
      };
      const result = getErrorsList(fields);
      expect(result).toEqual(expected);
    },
  );
});

describe('getValuesList', () => {
  it.each`
    lastname     | firstname    | birthdate    | expected
    ${null}      | ${null}      | ${null}      | ${[]}
    ${undefined} | ${undefined} | ${undefined} | ${[]}
    ${''}        | ${''}        | ${[]}        | ${[]}
    ${'doe'}     | ${undefined} | ${null}      | ${['lastname']}
    ${undefined} | ${'john'}    | ${null}      | ${['firstname']}
    ${''}        | ${''}        | ${['test']}  | ${['birthdate']}
    ${'doe'}     | ${'john'}    | ${null}      | ${['lastname', 'firstname']}
    ${'doe'}     | ${'john'}    | ${['test']}  | ${['lastname', 'firstname', 'birthdate']}
  `(
    'Should return expected: $expected when messages have lastname: $lastname, firstname: $firstname, birthdate: $birthdate',
    ({ lastname, firstname, birthdate, expected }) => {
      const fields = {
        lastname: {
          value: lastname,
          message: null,
        },
        firstname: {
          value: firstname,
          message: null,
        },
        birthdate: {
          values: birthdate,
          message: null,
        },
      };
      const result = getValuesList(fields);
      expect(result).toEqual(expected);
    },
  );
});
