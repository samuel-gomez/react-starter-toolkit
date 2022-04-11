import { STATUS_API } from 'shared/constants';

export const fetchNotifyError = ({ state, addNotification, serviceName, idNotifyAnomaly }) => {
  const { code, detail, label } = state?.anomaly?.[serviceName] ?? { code: '', detail: '', label: '' };
  if (`${code}`.startsWith(`${STATUS_API.ERROR}`) || `${code}`.startsWith(`${STATUS_API.WARNING}`)) {
    addNotification({
      code,
      detail,
      label,
      id: idNotifyAnomaly,
    });
  }
};

export const fetchNotifySuccess = ({ state, addNotification, idNotifySuccess }) => {
  const { code = '', detail = '', label = '' } = state;
  if (code === STATUS_API.SUCCESS) {
    addNotification({
      code,
      detail,
      label,
      type: 'success',
      id: idNotifySuccess,
    });
  }
};
