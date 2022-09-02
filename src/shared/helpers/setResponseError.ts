import { STATUS_API, STATUS_HTTP_MESSAGES } from 'shared/constants';

type TsetResponseError = {
  response: {
    anomaly?: {
      label?: string;
      detail?: string;
    };
    status: number;
  };
};

const setResponseError = ({ response }: TsetResponseError) => {
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
