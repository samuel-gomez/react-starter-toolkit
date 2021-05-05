import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import './ModalCommon.scss';

const propTypes = {
  icon: PropTypes.string,
  anomaly: PropTypes.shape({
    code: PropTypes.number,
    detail: PropTypes.string,
    label: PropTypes.string,
  }),
  title: PropTypes.node,
  children: PropTypes.node,
};
const defaultProps = {
  anomaly: null,
  title: '',
  children: null,
  icon: '',
};

const ModalCommonBody = ({ icon, title, anomaly, children }) => (
  <Modal.Body>
    {anomaly && (
      <Alert classModifier={anomaly.type} icon={anomaly.iconName} title={anomaly.label}>
        {anomaly.detail}
      </Alert>
    )}
    {icon !== '' && <img className="af-modal__image" src={icon} alt={icon} />}
    {title !== '' && <h4 className="af-modal__title">{title}</h4>}
    {children}
  </Modal.Body>
);

ModalCommonBody.propTypes = propTypes;
ModalCommonBody.defaultProps = defaultProps;

export default ModalCommonBody;
