import React from 'react';
import PropTypes from 'prop-types';
import { ClassManager } from '@axa-fr/react-toolkit-all';
import { Notifications } from './Notifications';
import { DEFAULT_CLASS_NOTIFICATION, MODIFIER_OPEN } from './constants';

const NotificationsEnhanced = ({ className, notifications, deleteNotification, ...rest }) => {
  const newClassModifier = [notifications.length > 0 ? MODIFIER_OPEN : ''].join(' ');
  const classComponent = ClassManager.getComponentClassName(className, newClassModifier);
  return <Notifications {...rest} notifications={notifications} className={classComponent} deleteNotification={deleteNotification} />;
};

export const notificationsEnhancedPropTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      detail: PropTypes.string,
    }),
  ),
};
export const notificationsEnhancedDefaultProps = {
  className: DEFAULT_CLASS_NOTIFICATION,
  notifications: [],
};

NotificationsEnhanced.propTypes = notificationsEnhancedPropTypes;
NotificationsEnhanced.defaultProps = notificationsEnhancedDefaultProps;

export default NotificationsEnhanced;
