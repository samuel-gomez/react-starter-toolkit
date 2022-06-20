import { NotificationContext } from 'App/NotificationProvider';
import { useCallback, useContext } from 'react';

const useNotify = ({ useContextFn = useContext, NotificationContextObj = NotificationContext }) => {
  const { addNotification } = useContextFn(NotificationContextObj);

  const notifyError = useCallback(() => {
    addNotification({
      code: 500,
      detail: '',
      label: 'Erreur : Contactez le support',
      id: 'idNotifyAnomaly',
    });
  }, [addNotification]);

  const notifySuccess = useCallback(() => {
    addNotification({
      code: 200,
      detail: '',
      type: 'success',
      label: 'Success : opération réussie',
      id: 'idNotifySuccess',
    });
  }, [addNotification]);

  const notifyWarning = useCallback(() => {
    addNotification({
      code: 404,
      detail: '',
      type: 'danger',
      label: 'Warning : opération not found',
      id: 'idNotifyDanger',
    });
  }, [addNotification]);

  return { notifyError, notifySuccess, notifyWarning };
};

export default useNotify;
