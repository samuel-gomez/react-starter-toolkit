import { setResponses, setResponse, addError, addSuccess } from './setResponses';

describe('setResponses', () => {
  const setErrorMock = jest.fn();
  const setSuccessMock = jest.fn();

  it('Should called setError with alert icon and type danger when code = 404', () => {
    const responsesServices = [];
    responsesServices.normes = {
      statusHttp: 404,
      responseBody: {},
      anomaly: {
        errors: [],
        code: 404,
        detail: '',
        label: "Erreur: impossible d'afficher les normes",
      },
    };

    setResponses({
      responsesServices,
      setSuccess: setSuccessMock,
      setError: setErrorMock,
    });

    expect(setErrorMock).toBeCalledWith({
      normes: {
        code: 404,
        detail: '',
        errors: [],
        label: "Erreur: impossible d'afficher les normes",
        iconName: 'alert',
        type: 'danger',
      },
    });
    expect(setSuccessMock).not.toBeCalled();
  });
  it('Should called setError with basic options when code = 505', () => {
    const responsesServices = [];
    responsesServices.normes = {
      statusHttp: 500,
      responseBody: {},
      anomaly: {
        errors: [],
        code: 500,
        detail: '',
        label: "Erreur: impossible d'afficher les normes",
      },
    };
    setResponses({
      responsesServices,
      setSuccess: setSuccessMock,
      setError: setErrorMock,
    });

    expect(setErrorMock).toBeCalledWith({
      normes: { code: 500, detail: '', errors: [], label: "Erreur: impossible d'afficher les normes" },
    });
    expect(setSuccessMock).not.toBeCalled();
  });
  it('Should called setSuccess when no code error', () => {
    const responsesServices = [];
    responsesServices.normes = [
      {
        statusHttp: 200,
        responseBody: { id: 'id' },
      },
    ];

    setResponses({
      responsesServices,
      setSuccess: setSuccessMock,
      setError: setErrorMock,
    });

    expect(setErrorMock).not.toBeCalled();
    expect(setSuccessMock).toBeCalled();
  });
  it('Should called callbackSuccess when callbackSuccess not null or undefined', () => {
    const responsesServices = [];
    responsesServices.normes = [
      {
        responseBody: { id: 'id' },
      },
    ];
    const callbackSuccessMock = jest.fn();

    setResponses({
      responsesServices,
      setSuccess: setSuccessMock,
      setError: setErrorMock,
      callbackSuccess: callbackSuccessMock,
    });

    expect(callbackSuccessMock).toBeCalled();
  });
});

describe('setResponse', () => {
  it('Should call addErrorFn When code 404', () => {
    const responseService = {
      anomaly: {
        code: 404,
      },
      statusHttp: 404,
      responseBody: {},
    };
    const addErrorMock = jest.fn();
    setResponse({ responses: 'responses', responseService, key: 1, addErrorFn: addErrorMock });
    expect(addErrorMock).toBeCalledWith({
      responses: 'responses',
      key: 1,
      error: {
        code: 404,
        type: 'danger',
        iconName: 'alert',
      },
    });
  });
  it('Should call addErrorFn When code 500', () => {
    const responseService = {
      anomaly: {
        code: 500,
      },
      statusHttp: 500,
      responseBody: {},
    };
    const addErrorMock = jest.fn();
    setResponse({ responses: 'responses', responseService, key: 1, addErrorFn: addErrorMock });
    expect(addErrorMock).toBeCalledWith({
      responses: 'responses',
      key: 1,
      error: {
        code: 500,
      },
    });
  });
  it('Should call addSuccessFn When no code', () => {
    const responseService = {
      anomaly: {},
      statusHttp: 200,
      responseBody: { result: 'ok' },
    };
    const addSuccessMock = jest.fn();
    setResponse({ responses: 'responses', responseService, key: 1, addSuccessFn: addSuccessMock });
    expect(addSuccessMock).toBeCalledWith({
      responses: 'responses',
      key: 1,
      success: responseService,
    });
  });
});

describe('addError', () => {
  it('Should return new error list When addError with new error', () => {
    const responses = {
      error: { organizations: 'first' },
    };
    const result = addError({ responses, error: 'myerror', key: 'norme' });
    const expected = { error: { organizations: 'first', norme: 'myerror' } };
    expect(result).toEqual(expected);
  });
});

describe('addSuccess', () => {
  it('Should return new success list When addError with new success', () => {
    const responses = {
      success: { organizations: 'first' },
    };
    const result = addSuccess({ responses, success: 'mysuccess', key: 'norme' });
    const expected = { success: { organizations: 'first', norme: 'mysuccess' } };
    expect(result).toEqual(expected);
  });
});
