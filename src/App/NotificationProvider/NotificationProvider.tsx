import { createContext, ReactNode, useMemo } from 'react';
import { emptyFunction } from 'shared/helpers';
import Notifications from './Notifications';
import useNotifications, { TaddNotification } from './Notifications.hook';

export type TNotificationContext = {
  addNotification: TaddNotification;
};

export const NotificationContext = createContext<TNotificationContext>({ addNotification: emptyFunction });
NotificationContext.displayName = 'NotificationContext';

type TNotificationProvider = {
  children: ReactNode;
  useNotificationsFn?: typeof useNotifications;
};

const NotificationProvider = ({ children, useNotificationsFn = useNotifications }: TNotificationProvider) => {
  const { addNotification, onDeleteNotification, stateNotifications } = useNotificationsFn();
  const value = useMemo(() => ({ addNotification }), [addNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {stateNotifications && stateNotifications.length > 0 && (
        <Notifications notifications={stateNotifications} deleteNotification={onDeleteNotification} />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
