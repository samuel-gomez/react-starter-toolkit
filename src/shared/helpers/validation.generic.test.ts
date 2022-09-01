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

const rules = {
  NAME: [rulesRequired],
  EMAIL: [rulesRequired],
  YEAR: [rulesRequired],
  QUARTER: [rulesRequired],
  ENTITY: [rulesRequired],
};

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
    'Should return exoected: $expected when inputRules: $inputRules, viewValue: $viewValue, value: $value, values: $values, errors: $errors',
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
    value        | rules         | firstErrorValue                 | validateViewValue | expected
    ${undefined} | ${undefined}  | ${null}                         | ${[]}             | ${null}
    ${'myvalue'} | ${rules.NAME} | ${null}                         | ${[]}             | ${null}
    ${12345678}  | ${rules.NAME} | ${null}                         | ${[]}             | ${null}
    ${''}        | ${rules.NAME} | ${{ message: expectedMessage }} | ${[]}             | ${expectedMessage}
  `(
    'Should return exoected: $expected when value: $value, rules: $rules, firstErrorValue: $firstErrorValue, validateViewValue: $validateViewValue',
    ({ value, rules, firstErrorValue, validateViewValue, expected }) => {
      firstError.mockReturnValue(firstErrorValue);
      validateView.mockReturnValue(validateViewValue);

      const result = validate({ rules, value, ValidateFn });

      expect(result).toEqual(expected);
    },
  );
});

describe('genericHandleChange', () => {
  it('Should return state with message "Format de fichier incorrect" when event.errors not empty and event.values is defined', () => {
    const rules = {
      agent: [{ required: { message: 'Format de fichier incorrect' } }],
    };
    const givenState = {
      agent: {
        name: 'agent',
        value: '',
        message: 'Format de fichier incorrect',
      },
    };
    const givenEvent = {
      values: ['Guillaume Chervet'],
      errors: ['error'],
      name: 'agent',
    };
    const expectedState = {
      agent: {
        message: 'Format de fichier incorrect',
        name: 'agent',
        value: '',
        values: ['Guillaume Chervet'],
      },
    };

    const result = genericHandleChange(rules, givenState, givenEvent);
    expect(result).toMatchObject(expectedState);
  });

  it('Should return state with no error and no message when event.errors is empty and event.values is NOT empty', () => {
    const rules = {
      agent: [{ required: { message: 'Champ obligatoire' } }],
    };
    const givenState = {
      agent: {
        name: 'agent',
        values: [''],
      },
    };
    const givenEvent = {
      values: ['Guillaume Chervet'],
      errors: [],
      name: 'agent',
    };
    const expectedState = {
      agent: {
        name: 'agent',
        errors: [],
        values: ['Guillaume Chervet'],
      },
    };

    const result = genericHandleChange(rules, givenState, givenEvent);
    expect(result).toMatchObject(expectedState);
  });

  it('Should return state with viewValues when event.viewValue is defined', () => {
    const rules = {
      agent: [{ required: { message: 'Format de fichier incorrect' } }],
    };
    const givenState = {
      agent: {
        name: 'agent',
        value: '',
        message: 'Format de fichier incorrect',
      },
    };
    const givenEvent = {
      viewValue: 'Guillaume Chervet',
      value: 'guillaume_chervet',
      name: 'agent',
    };
    const expectedState = {
      agent: {
        message: null,
        name: 'agent',
        value: 'guillaume_chervet',
        viewValue: 'Guillaume Chervet',
      },
    };

    const result = genericHandleChange(rules, givenState, givenEvent);

    expect(result).toMatchObject(expectedState);
  });

  it('Should change the state when a field changed with one text change', () => {
    // arrange
    const rules = {
      firstname: [{ required: { message: 'Le champs est obligatoire' } }],
      agent: [{ required: { message: 'Le champs est obligatoire' } }],
      contract: [
        { required: { message: 'Le champs est obligatoire' } },
        {
          maxLength: {
            maxLength: 8,
            message: 'Le champ contient trop de caractères',
          },
        },
        { pattern: { regex: {}, message: 'Veuillez saisir un nombre' } },
      ],
      lastname: [{ required: { message: 'Le champs est obligatoire' } }],
      birthdate: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
      begin: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
    };
    const givenState = {
      firstname: {
        name: 'firstname',
        value: '',
        message: 'Le champs est obligatoire',
      },
      agent: { name: 'agent', value: '', message: 'Le champs est obligatoire' },
      lastname: {
        name: 'lastname',
        value: '',
        message: 'Le champs est obligatoire',
      },
      contract: {
        name: 'contract',
        value: '',
        message: 'Le champs est obligatoire',
      },
      birthdate: {
        name: 'birthdate',
        value: null,
        viewValue: '',
        message: 'Le champs est obligatoire',
      },
      begin: {
        name: 'begin',
        value: null,
        viewValue: '',
        message: 'Le champs est obligatoire',
      },
    };
    const givenEvent = {
      value: 'Martin',
      name: 'lastname',
      id: 'cjv3mxouh00063h5qzj5bw1xw',
    };
    const expectedState = {
      agent: { message: 'Le champs est obligatoire', name: 'agent', value: '' },
      begin: {
        message: 'Le champs est obligatoire',
        name: 'begin',
        value: null,
        viewValue: '',
      },
      birthdate: {
        message: 'Le champs est obligatoire',
        name: 'birthdate',
        value: null,
        viewValue: '',
      },
      contract: {
        message: 'Le champs est obligatoire',
        name: 'contract',
        value: '',
      },
      firstname: {
        message: 'Le champs est obligatoire',
        name: 'firstname',
        value: '',
      },
      lastname: { message: null, name: 'lastname', value: 'Martin' },
    };

    // act
    const valid = genericHandleChange(rules, givenState, givenEvent);

    // assert
    expect(valid).toMatchObject(expectedState);
  });

  it('Should change the state when a field changed with multiple changes', () => {
    // arrange
    const rules = {
      firstname: [{ required: { message: 'Le champs est obligatoire' } }],
      agent: [{ required: { message: 'Le champs est obligatoire' } }],
      contract: [
        { required: { message: 'Le champs est obligatoire' } },
        {
          maxLength: {
            maxLength: 8,
            message: 'Le champ contient trop de caractères',
          },
        },
        { pattern: { regex: {}, message: 'Veuillez saisir un nombre' } },
      ],
      lastname: [{ required: { message: 'Le champs est obligatoire' } }],
      birthdate: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
      begin: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
    };
    const givenState = {
      firstname: {
        name: 'firstname',
        value: '',
        message: 'Le champs est obligatoire',
      },
      agent: {
        name: 'agent',
        values: [''],
        message: 'Le champs est obligatoire',
      },
      lastname: {
        name: 'lastname',
        value: '',
        message: 'Le champs est obligatoire',
      },
      contract: {
        name: 'contract',
        value: '',
        message: 'Le champs est obligatoire',
      },
      birthdate: {
        name: 'birthdate',
        value: null,
        viewValue: '',
        message: 'Le champs est obligatoire',
      },
      begin: {
        name: 'begin',
        value: null,
        viewValue: '',
        message: 'Le champs est obligatoire',
      },
    };
    const givenEvent = {
      values: ['Guillaume Chervet'],
      errors: ['error'],
      name: 'agent',
      id: 'agent',
    };
    const expectedState = {
      agent: {
        message: 'Format de fichier incorrect',
        name: 'agent',
        values: ['Guillaume Chervet'],
      },
      begin: {
        message: 'Le champs est obligatoire',
        name: 'begin',
        value: null,
        viewValue: '',
      },
      birthdate: {
        message: 'Le champs est obligatoire',
        name: 'birthdate',
        value: null,
        viewValue: '',
      },
      contract: {
        message: 'Le champs est obligatoire',
        name: 'contract',
        value: '',
      },
      firstname: {
        message: 'Le champs est obligatoire',
        name: 'firstname',
        value: '',
      },
      lastname: {
        message: 'Le champs est obligatoire',
        name: 'lastname',
        value: '',
      },
    };

    // act
    const valid = genericHandleChange(rules, givenState, givenEvent);

    // assert
    expect(valid).toMatchObject(expectedState);
  });

  it('Should change the state when a date field had a changed', () => {
    // arrange
    const rules = {
      firstname: [{ required: { message: 'Le champs est obligatoire' } }],
      agent: [{ required: { message: 'Le champs est obligatoire' } }],
      contract: [
        { required: { message: 'Le champs est obligatoire' } },
        {
          maxLength: {
            maxLength: 8,
            message: 'Le champ contient trop de caractères',
          },
        },
        { pattern: { regex: {}, message: 'Veuillez saisir un nombre' } },
      ],
      lastname: [{ required: { message: 'Le champs est obligatoire' } }],
      birthdate: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
      begin: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
    };
    const givenState = {
      firstname: { name: 'firstname', value: 'François', message: null },
      agent: { name: 'agent', value: '', message: 'Le champs est obligatoire' },
      lastname: { name: 'lastname', value: 'Martin', message: null },
      contract: {
        name: 'contract',
        value: '',
        message: 'Le champs est obligatoire',
      },
      birthdate: {
        name: 'birthdate',
        value: null,
        viewValue: '',
        message: 'Le champs est obligatoire',
      },
      begin: {
        name: 'begin',
        value: null,
        viewValue: '',
        message: 'Le champs est obligatoire',
      },
    };
    const givenEvent = {
      value: '2019-05-02T22:00:00.000Z',
      viewValue: '03/05/2019',
      name: 'birthdate',
      id: 'cjv6b2led000t3h5qe3e2ryzl',
    };
    const expectedState = {
      agent: { message: 'Le champs est obligatoire', name: 'agent', value: '' },
      begin: {
        message: 'Le champs est obligatoire',
        name: 'begin',
        value: null,
        viewValue: '',
      },
      birthdate: {
        message: null,
        name: 'birthdate',
        value: '2019-05-02T22:00:00.000Z',
        viewValue: '03/05/2019',
      },
      contract: {
        message: 'Le champs est obligatoire',
        name: 'contract',
        value: '',
      },
      firstname: { message: null, name: 'firstname', value: 'François' },
      lastname: { message: null, name: 'lastname', value: 'Martin' },
    };

    // act
    const valid = genericHandleChange(rules, givenState, givenEvent);

    // assert
    expect(valid).toMatchObject(expectedState);
  });

  it('Should not change the state if the rule is unknown', () => {
    // arrange
    const unknownRules = {
      unknown: [{ required: { message: 'Le champs est obligatoire' } }],
    };
    const givenState = {};
    const givenEvent = {
      value: '2019-05-02T22:00:00.000Z',
      viewValue: '03/05/2019',
      name: 'birthdate',
      id: 'cjv6b2led000t3h5qe3e2ryzl',
    };
    const expectedState = {};

    // act
    const valid = genericHandleChange(unknownRules, givenState, givenEvent);

    // assert
    expect(valid).toMatchObject(expectedState);
  });

  it('Should initiate the state when rules are presents', () => {
    // arrange
    const givenRules = {
      firstname: [{ required: { message: 'Le champs est obligatoire' } }],
      agent: [{ required: { message: 'Le champs est obligatoire' } }],
      contract: [
        { required: { message: 'Le champs est obligatoire' } },
        {
          maxLength: {
            maxLength: 8,
            message: 'Le champ contient trop de caractères',
          },
        },
        { pattern: { regex: {}, message: 'Veuillez saisir un nombre' } },
      ],
      lastname: [{ required: { message: 'Le champs est obligatoire' } }],
      birthdate: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
      begin: [{ required: { message: 'Le champs est obligatoire' } }, { date: { message: 'La date est invalide' } }],
    };
    const givenState = {
      firstname: { name: 'firstname', value: 'François', message: null },
    };
    const expectedState = {};

    // act
    const valid = computeInitialStateErrorMessage(givenState, givenRules);

    // assert
    expect(valid).toMatchObject(expectedState);
  });
});

describe('Function hasErrorMessage', () => {
  it('Should return true when message is not null', () => {
    const fields = {
      name: {
        message: 'hello',
      },
    };
    const results = hasErrorMessage(fields.name);
    expect(results).toBe(true);
  });

  it('Should return false when message is null', () => {
    const fields = {
      name: {
        message: null,
      },
    };
    const results = hasErrorMessage(fields.name);
    expect(results).toBe(false);
  });
});

describe('Function getErrorsList', () => {
  it('Should return error array with 2 items when 2 fields have error', () => {
    const fields = {
      lastname: {
        message: 'doe',
      },
      firstname: {
        message: 'john',
      },
      birthdate: {
        message: null,
      },
    };
    const expected = ['lastname', 'firstname'];
    const results = getErrorsList(fields);
    expect(results).toEqual(expected);
  });

  it('Should return empty array when all messages are null', () => {
    const fields = {
      lastname: {
        message: null,
      },
      firstname: {
        message: null,
      },
      birthdate: {
        message: null,
      },
    };
    const expected = [] as ReturnType<typeof getErrorsList>;
    const results = getErrorsList(fields);
    expect(results).toEqual(expected);
  });
});

describe('Function getValuesList', () => {
  it('Should return values array with 2 items when 2 fields have value', () => {
    const fields = {
      lastname: {
        value: 'doe',
        message: null,
      },
      firstname: {
        value: 'john',
        message: null,
      },
      birthdate: {
        value: '',
        message: null,
      },
    };
    const expected = ['lastname', 'firstname'];
    const results = getValuesList(fields);
    expect(results).toEqual(expected);
  });

  it('Should return empty array when all value are empty', () => {
    const fields = {
      lastname: {
        value: '',
        message: null,
      },
      firstname: {
        value: '',
        message: null,
      },
      birthdate: {
        value: null,
        message: null,
      },
    };
    const expected = [] as ReturnType<typeof getErrorsList>;
    const results = getValuesList(fields);
    expect(results).toEqual(expected);
  });
});
