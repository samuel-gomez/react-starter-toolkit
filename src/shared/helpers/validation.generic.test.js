import { validate, genericHandleChange, computeInitialStateErrorMessage, hasErrorMessage, getErrorsList, getValuesList } from './validation.generic';

import { MSG_REQUIRED } from '../constants';

const rulesRequired = {
  required: {
    message: MSG_REQUIRED,
  },
};

const rules = {
  NORME: [rulesRequired],
  PROCESSUS: [rulesRequired],
  YEAR: [rulesRequired],
  QUARTER: [rulesRequired],
  ENTITY: [rulesRequired],
};

describe('validation.generic.js - Valid the form with the rules', () => {
  it('Should valid the norme', () => {
    // arrange
    const givenNorme = 'IFRS17';

    // act
    const valid = validate({ rules: rules.NORME, value: givenNorme });

    // assert
    expect(valid).toBe(null);
  });

  it('Should valid the norme', () => {
    // arrange
    const givenNorme = 12345678;

    // act
    const valid = validate({ rules: rules.NORME, value: givenNorme });

    // assert
    expect(valid).toBe(null);
  });

  it('Should return null When NORME value equal "123456789" ', () => {
    const ValidateMock = {
      validation: {
        firstError: jest.fn().mockReturnValue(null),
        validateView: jest.fn().mockReturnValue([]),
      },
    };

    const result = validate({
      ValidateFn: ValidateMock,
      rules: rules.NORME,
      value: '12345678',
    });

    expect(result).toBe(null);
  });

  it('Should return first message result the norme value is empty', () => {
    const expectedMessage = 'this is this first error';
    const ValidateMock = {
      validation: {
        firstError: jest.fn().mockReturnValue({ message: expectedMessage }),
        validateView: jest.fn().mockReturnValue([]),
      },
    };

    const result = validate({
      ValidateFn: ValidateMock,
      rules: rules.NORME,
      value: '',
    });

    expect(result).toBe(expectedMessage);
  });

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
    const results = hasErrorMessage('name')(fields);
    expect(results).toBe(true);
  });

  it('Should return false when message is null', () => {
    const fields = {
      name: {
        message: null,
      },
    };
    const results = hasErrorMessage('name')(fields);
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
    const expected = [];
    const results = getErrorsList(fields);
    expect(results).toEqual(expected);
  });
});

describe('Function getValuesList', () => {
  it('Should return values array with 2 items when 2 fields have value', () => {
    const fields = {
      lastname: {
        value:'doe',
      },
      firstname: {
        value: 'john',
      },
      birthdate: {
        value: '',
      },
    };
    const expected = ['lastname', 'firstname'];
    const results = getValuesList(fields);
    expect(results).toEqual(expected);
  });

  it('Should return empty array when all value are empty', () => {
    const fields = {
      lastname: {
        value:'',
      },
      firstname: {
        value:'',
      },
      birthdate: {
        value: null,
      },
    };
    const expected = [];
    const results = getValuesList(fields);
    expect(results).toEqual(expected);
  });
});
