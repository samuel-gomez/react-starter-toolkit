import { NotificationContext } from 'App/NotificationProvider';
import { useCallback, useContext } from 'react';

const useNotify = ({ useContextFn = useContext, NotificationContextObj = NotificationContext }) => {
  const { addNotification } = useContextFn(NotificationContextObj);

  const notifyError = useCallback(() => {
    addNotification({
      detail: '',
      label: 'Erreur : Contactez le support',
      id: 'idNotifyAnomaly',
    });
  }, [addNotification]);

  const notifySuccess = useCallback(() => {
    addNotification({
      detail: '',
      type: 'success',
      label: 'Success : opération réussie',
      id: 'idNotifySuccess',
    });
  }, [addNotification]);

  const notifyWarning = useCallback(() => {
    addNotification({
      detail: '',
      type: 'danger',
      label: 'Warning : opération not found',
      id: 'idNotifyDanger',
    });
  }, [addNotification]);

  return { notifyError, notifySuccess, notifyWarning };
};

export type TReturnUseNotify = ReturnType<typeof useNotify>;

export default useNotify;
