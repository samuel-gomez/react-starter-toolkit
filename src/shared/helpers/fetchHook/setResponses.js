import { isEmpty, isNil } from 'lodash';
import { STATUS_API, STATUS_HTTP, STATUS_HTTP_MESSAGES } from 'shared/constants';

export const addError = ({ responses, error, key }) => ({
  ...responses,
  error: { ...responses.error, [key]: error },
});

export const addSuccess = ({ responses, success, key }) => ({
  ...responses,
  success: { ...responses.success, [key]: success },
});

export const setResponse = ({ responses, responseService, key, addErrorFn = addError, addSuccessFn = addSuccess }) => {
  const { anomaly, statusHttp } = responseService;
  switch (true) {
    case `${statusHttp}`.startsWith(`${STATUS_API.WARNING}`):
      return addErrorFn({
        responses,
        key,
        error: {
          ...anomaly,
          label: anomaly?.label ?? STATUS_HTTP_MESSAGES[statusHttp],
          type: 'danger',
          iconName: 'alert',
        },
      });
    case `${statusHttp}`.startsWith(`${STATUS_API.ERROR}`):
      return addErrorFn({
        responses,
        key,
        error: {
          ...anomaly,
          label: anomaly?.label ?? STATUS_HTTP_MESSAGES[statusHttp],
        },
      });
    default:
      return addSuccessFn({ responses, key, success: formatSuccessResponse(responseService) });
  }
};

export const formatSuccessResponse = responseService =>
  responseService.statusHttp
    ? responseService
    : {
        responseBody: responseService,
        anomaly: null,
        statusHttp: STATUS_HTTP.SUCCESS,
        code: STATUS_HTTP.SUCCESS,
        label: STATUS_HTTP_MESSAGES[STATUS_HTTP.SUCCESS],
      };

export const setResponses = ({ responsesServices, setError, setSuccess, callbackSuccess }) => {
  let responses = { success: [], error: [] };
  for (const [key, responseService] of Object.entries(responsesServices)) {
    responses = setResponse({ responses, responseService, key });
  }
  if (!isEmpty(Object.keys(responses.success))) {
    setSuccess(responses.success);
    if (!isNil(callbackSuccess)) {
      callbackSuccess(responses.success);
    }
  }
  if (!isEmpty(Object.keys(responses.error))) {
    setError(responses.error);
  }
};
