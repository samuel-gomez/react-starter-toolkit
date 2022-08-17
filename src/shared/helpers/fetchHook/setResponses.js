import { STATUS_API, STATUS_HTTP_MESSAGES } from 'shared/constants';

export const setResponse = ({ response }) => {
  const { anomaly, code } = response;
  switch (true) {
    case `${code}`.startsWith(`${STATUS_API.WARNING}`):
      return {
        ...anomaly,
        label: anomaly?.label ?? STATUS_HTTP_MESSAGES[code],
        type: 'danger',
        iconName: 'alert',
      };
    case `${code}`.startsWith(`${STATUS_API.ERROR}`):
      return {
        ...anomaly,
        label: anomaly?.label ?? STATUS_HTTP_MESSAGES[code],
      };
    default:
      return {};
  }
};
