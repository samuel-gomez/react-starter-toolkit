import { STATUS_HTTP_MESSAGES } from 'shared/constants';
import setResponseError from '../setResponseError';

describe('setResponseError', () => {
  it('Should return 404 danger', () => {
    const responseService = {
      anomaly: {
        label: 'test',
        detail: '',
      },
      status: 404,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: responseService.anomaly?.label,
      type: 'danger',
      iconName: 'alert',
    });
  });

  it('Should return 404 danger with generic label when anomaly is undefined', () => {
    const responseService = {
      anomaly: undefined,
      status: 404,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      label: STATUS_HTTP_MESSAGES[responseService.status],
      type: 'danger',
      iconName: 'alert',
      detail: '',
    });
  });

  it('Should return 500 error', () => {
    const responseService = {
      anomaly: {
        label: 'test',
        detail: '',
      },
      status: 500,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      ...responseService.anomaly,
      label: responseService.anomaly?.label,
    });
  });

  it('Should return 500 error with generic label when anomaly is undefined', () => {
    const responseService = {
      anomaly: undefined,
      status: 500,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({
      label: STATUS_HTTP_MESSAGES[responseService.status],
      detail: '',
    });
  });

  it('Should return empty object', () => {
    const responseService = {
      anomaly: {
        label: 'test',
        detail: '',
      },
      status: 100,
      responseBody: {},
    };
    const result = setResponseError({ response: responseService });
    expect(result).toEqual({});
  });
});
