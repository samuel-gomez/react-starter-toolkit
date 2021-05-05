import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';

const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  hasErrors: PropTypes.bool,
  confirmClassModifier: PropTypes.string,
  cancelClassModifier: PropTypes.string,
};

const defaultProps = {
  cancelLabel: 'Annuler',
  confirmLabel: 'Confirmer',
  hasErrors: false,
  confirmClassModifier: 'success',
  cancelClassModifier: 'reverse',
};

const ModalCommonFooter = ({ onSubmit, onCancel, cancelLabel, confirmLabel, hasErrors, confirmClassModifier, cancelClassModifier }) => (
  <Modal.Footer>
    {onCancel && (
      <Button className="btn af-btn" onClick={onCancel} classModifier={cancelClassModifier}>
        <span className="af-btn__text">{cancelLabel}</span>
      </Button>
    )}
    {onSubmit && (
      <Button disabled={hasErrors} className="btn af-btn" classModifier={`hasiconRight ${confirmClassModifier}`} type="button" onClick={onSubmit}>
        <span className="af-btn__text">{confirmLabel}</span>
        <i className="glyphicon glyphicon-arrowthin-right" />
      </Button>
    )}
  </Modal.Footer>
);

ModalCommonFooter.propTypes = propTypes;
ModalCommonFooter.defaultProps = defaultProps;

export default ModalCommonFooter;
