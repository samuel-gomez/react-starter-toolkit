import React from 'react';
import { string, func } from 'prop-types';
import { Alert } from '@axa-fr/react-toolkit-all';
import { ALERT_ICON } from '../constants';

const Notification = ({ id, title, detail, onClose, classModifier, type }) => (
  <Alert key={id} icon={ALERT_ICON[type]} title={title} classModifier={`notification ${classModifier}`} onClose={onClose}>
    {detail && <p>{detail}</p>}
  </Alert>
);

export const notificationPropTypes = {
  id: string.isRequired,
  title: string.isRequired,
  classModifier: string,
  detail: string,
  type: string,
  onClose: func,
};

export const notificationDefaultProps = {
  classModifier: '',
  detail: '',
  type: '',
};

Notification.propTypes = notificationPropTypes;
Notification.defaultProps = notificationDefaultProps;

export default Notification;
