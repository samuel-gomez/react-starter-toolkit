import { STATUS_API, STATUS_HTTP_MESSAGES } from 'shared/constants';

const setResponseError = ({ response }) => {
  const { anomaly, status } = response;
  switch (true) {
    case `${status}`.startsWith(`${STATUS_API.WARNING}`):
      return {
        ...anomaly,
        label: anomaly?.label ?? STATUS_HTTP_MESSAGES[status],
        detail: anomaly?.detail ?? '',
        type: 'danger',
        iconName: 'alert',
      };
    case `${status}`.startsWith(`${STATUS_API.ERROR}`):
      return {
        ...anomaly,
        label: anomaly?.label ?? STATUS_HTTP_MESSAGES[status],
        detail: anomaly?.detail ?? '',
      };
    default:
      return {};
  }
};

export default setResponseError;
