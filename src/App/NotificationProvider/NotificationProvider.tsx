import { createContext, ReactNode } from 'react';
import Notifications, { TNotification } from './Notifications';
import useNotifications from './Notifications.hook';

export type TNotificationContext = {
  addNotification?: ((arg0: TNotification) => void) | null;
};

export const NotificationContext = createContext<TNotificationContext | null>({ addNotification: null });
NotificationContext.displayName = 'NotificationContext';

type TNotificationProvider = {
  children: ReactNode;
  useNotificationsFn?: typeof useNotifications;
};

const NotificationProvider = ({ children, useNotificationsFn = useNotifications }: TNotificationProvider) => {
  const { addNotification, onDeleteNotification, stateNotifications } = useNotificationsFn();
  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {stateNotifications && stateNotifications.length > 0 && (
        <Notifications notifications={stateNotifications} deleteNotification={onDeleteNotification} />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
