import React from 'react';
import { func, string } from 'prop-types';
import Modal from '@axa-fr/react-toolkit-modal-default';

const ModalCommonHeader = ({ title, onCancel }) => (
  <Modal.HeaderBase>
    <h4 className="af-modal__header-title">{title}</h4>
    <button className="af-modal__header-close-btn" type="button" aria-label="Close" onClick={onCancel}>
      <span className="glyphicon glyphicon-close" aria-hidden="true" />
    </button>
  </Modal.HeaderBase>
);

const propTypes = {
  onCancel: func.isRequired,
  title: string,
};
const defaultProps = {
  title: 'Title of modal',
};

ModalCommonHeader.propTypes = propTypes;
ModalCommonHeader.defaultProps = defaultProps;

export default ModalCommonHeader;
