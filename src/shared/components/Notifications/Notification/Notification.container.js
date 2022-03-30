import React from 'react';
import { string } from 'prop-types';
import Notification from './Notification';

const NotificationEnhanced = ({ classModifier, type, ...rest }) => {
  const newClassModifier = [type, classModifier].join(' ');
  return <Notification {...rest} type={type} classModifier={newClassModifier} />;
};

export const notificationEnhancedPropTypes = {
  classModifier: string,
  type: string,
};

export const notificationEnhancedDefaultProps = { classModifier: '', type: 'error' };

NotificationEnhanced.propTypes = notificationEnhancedPropTypes;
NotificationEnhanced.defaultProps = notificationEnhancedDefaultProps;

export default NotificationEnhanced;
