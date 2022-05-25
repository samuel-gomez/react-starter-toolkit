import { createContext } from 'react';
import { node, func } from 'prop-types';
import Notifications, { useNotifications } from 'shared/components/Notifications';

export const NotificationContext = createContext({ addNotification: null });
NotificationContext.displayName = 'NotificationContext';
const { Provider: NotificationContextProvider } = NotificationContext;

const NotificationProvider = ({ children, useNotificationsFn }) => {
  const { addNotification, onDeleteNotification, stateNotifications } = useNotificationsFn();
  return (
    <NotificationContextProvider value={{ addNotification }}>
      {stateNotifications && stateNotifications.length > 0 && (
        <Notifications notifications={stateNotifications} deleteNotification={onDeleteNotification} />
      )}
      {children}
    </NotificationContextProvider>
  );
};

NotificationProvider.propTypes = {
  children: node.isRequired,
  useNotificationsFn: func,
};

NotificationProvider.defaultProps = {
  useNotificationsFn: useNotifications,
};

export default NotificationProvider;
