import { useState, useCallback } from 'react';
import { MODIFIER_HIDE, DELAY_HIDE } from './Notifications/constants';
import { TNotification } from './Notifications/Notification';

const useNotifications = (initState?: TNotification[]) => {
  const [stateNotifications, setStateNotifications] = useState(initState || []);

  const clearAllNotifications = useCallback(() => {
    setStateNotifications([]);
  }, []);

  const onDeleteNotification = useCallback(
    (id: string) => {
      const notificationsWithHide = stateNotifications.map(notification =>
        notification.id === id ? { ...notification, classModifier: MODIFIER_HIDE } : notification,
      );

      setStateNotifications(notificationsWithHide);
      setTimeout(() => {
        const filteredNotifications = stateNotifications.filter(notification => notification.id !== id);
        setStateNotifications(filteredNotifications);
      }, DELAY_HIDE);
    },
    [stateNotifications],
  );

  const addNotification = useCallback(
    (notification: TNotification) => {
      if (stateNotifications.filter(notif => notif.id === notification.id).length === 0) {
        setStateNotifications([...stateNotifications, notification]);
      }
    },
    [stateNotifications],
  );

  return { addNotification, onDeleteNotification, clearAllNotifications, stateNotifications };
};

export type TReturnUseNotification = ReturnType<typeof useNotifications>;
export type TaddNotification = TReturnUseNotification['addNotification'];
export type TonDeleteNotification = TReturnUseNotification['onDeleteNotification'];

export default useNotifications;
