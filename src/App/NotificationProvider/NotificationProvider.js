import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import Notifications, { useNotifications } from 'shared/components/Notifications';

export const NotificationContext = createContext({ addNotification: null });
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
  children: PropTypes.node.isRequired,
  useNotificationsFn: PropTypes.func,
};

NotificationProvider.defaultProps = {
  useNotificationsFn: useNotifications,
};

export default NotificationProvider;
