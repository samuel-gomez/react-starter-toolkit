import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';

export const notificationEnhancedPropTypes = {
  classModifier: PropTypes.string,
  type: PropTypes.string,
};

export const notificationEnhancedDefaultProps = { classModifier: '', type: 'error' };

const NotificationEnhanced = ({ classModifier, type, ...rest }) => {
  const newClassModifier = [type, classModifier].join(' ');
  return <Notification {...rest} type={type} classModifier={newClassModifier} />;
};

NotificationEnhanced.propTypes = notificationEnhancedPropTypes;
NotificationEnhanced.defaultProps = notificationEnhancedDefaultProps;

export default NotificationEnhanced;
