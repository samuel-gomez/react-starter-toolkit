import { isEmpty, isNil } from 'lodash';
import { STATUS_API } from 'shared/constants';

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
          type: 'danger',
          iconName: 'alert',
        },
      });
    case `${statusHttp}`.startsWith(`${STATUS_API.ERROR}`):
      return addErrorFn({
        responses,
        key,
        error: anomaly,
      });
    default:
      return addSuccessFn({ responses, key, success: responseService });
  }
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
