import { string, arrayOf, shape, func } from 'prop-types';
import './Notifications.scss';
import { DEFAULT_CLASS_NOTIFICATION } from './constants';
import Notification, { notificationPropTypes } from './Notification';

export const Notifications = ({ className, notifications, deleteNotification }) => (
  <aside className={className}>
    {notifications.map(({ id, label, type = 'error', classModifier, ...rest }) => (
      <Notification key={id} id={id} title={label} type={type} classModifier={classModifier} onClose={() => deleteNotification(id)} {...rest} />
    ))}
  </aside>
);

export const notificationsPropTypes = {
  className: string,
  notifications: arrayOf(
    shape({
      ...notificationPropTypes,
    }),
  ).isRequired,
  deleteNotification: func.isRequired,
};

export const notificationsDefaultProps = {
  className: DEFAULT_CLASS_NOTIFICATION,
};

Notifications.propTypes = notificationsPropTypes;
Notifications.defaultProps = notificationsDefaultProps;
