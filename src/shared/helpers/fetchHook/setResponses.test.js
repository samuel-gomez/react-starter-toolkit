import { STATUS_HTTP_MESSAGES } from 'shared/constants';
import { setResponse } from './setResponses';

describe('setResponse', () => {
  it('Should return 404 danger', () => {
    const responseService = {
      anomaly: {
        label: 'test',
      },
      code: 404,
      responseBody: {},
    };
    const result = setResponse({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: responseService.anomaly?.label,
      type: 'danger',
      iconName: 'alert',
    });
  });
  it('Should return 404 danger with generic label when anomaly is null', () => {
    const responseService = {
      anomaly: null,
      code: 404,
      responseBody: {},
    };
    const result = setResponse({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: STATUS_HTTP_MESSAGES[responseService.code],
      type: 'danger',
      iconName: 'alert',
    });
  });
  it('Should return 500 error', () => {
    const responseService = {
      anomaly: {
        label: 'test',
      },
      code: 500,
      responseBody: {},
    };
    const result = setResponse({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: responseService.anomaly?.label,
    });
  });
  it('Should return 500 error with generic label when anomaly is null', () => {
    const responseService = {
      anomaly: null,
      code: 500,
      responseBody: {},
    };
    const result = setResponse({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: STATUS_HTTP_MESSAGES[responseService.code],
    });
  });
  it('Should return empty object', () => {
    const responseService = {
      anomaly: {
        label: 'test',
      },
      code: 100,
      responseBody: {},
    };
    const result = setResponse({ response: responseService });
    expect(result).toEqual({});
  });
});
