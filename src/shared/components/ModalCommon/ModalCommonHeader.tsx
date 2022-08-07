import { MouseEventHandler, ReactNode } from 'react';
import Modal from '@axa-fr/react-toolkit-modal-default';

export type TModalCommonHeader = {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  title?: ReactNode;
};

const ModalCommonHeader = ({ title = 'Title of modal', onCancel }: TModalCommonHeader) => (
  <Modal.HeaderBase>
    <h4 className="af-modal__header-title">{title}</h4>
    <button className="af-modal__header-close-btn" type="button" aria-label="Close" onClick={onCancel}>
      <span className="glyphicon glyphicon-close" aria-hidden="true" />
    </button>
  </Modal.HeaderBase>
);

export default ModalCommonHeader;
