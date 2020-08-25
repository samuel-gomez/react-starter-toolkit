import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@axa-fr/react-toolkit-all';
import { ALERT_ICON } from '../constants';

const Notification = ({ id, title, detail, onClose, classModifier, type }) => (
  <Alert key={id} icon={ALERT_ICON[type]} title={title} classModifier={`notification ${classModifier}`} onClose={onClose}>
    {detail && <p>{detail}</p>}
  </Alert>
);

export const notificationPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classModifier: PropTypes.string,
  detail: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func,
};

export const notificationDefaultProps = {
  classModifier: '',
  detail: '',
  type: '',
};

Notification.propTypes = notificationPropTypes;
Notification.defaultProps = notificationDefaultProps;

export default Notification;
