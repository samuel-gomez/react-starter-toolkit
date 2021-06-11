import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import useToggleModalConfirm from './Modal.hook';

const ModalContainer = ({ useToggleModalConfirmFn, ...rest }) => {
  const { closeModalConfirm, openModalConfirm, isOpenModalConfirm } = useToggleModalConfirmFn();

  return (
    <Modal
      {...rest}
      openModalConfirm={openModalConfirm}
      modalConfirmProps={{
        isOpen: isOpenModalConfirm,
        onCancel: closeModalConfirm,
      }}
    />
  );
};

ModalContainer.propTypes = {
  useToggleModalConfirmFn: PropTypes.func,
};

ModalContainer.defaultProps = {
  useToggleModalConfirmFn: useToggleModalConfirm,
};

export default ModalContainer;
