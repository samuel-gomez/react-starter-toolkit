import { HeaderBase } from '@axa-fr/react-toolkit-modal-default';
import { MouseEventHandler, ReactNode } from 'react';

export type TModalCommonHeader = {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  title?: ReactNode;
};

const ModalCommonHeader = ({ title = 'Title of modal', onCancel }: TModalCommonHeader) => (
  <HeaderBase>
    <h4 className="af-modal__header-title">{title}</h4>
    <button className="af-modal__header-close-btn" type="button" aria-label="Close" onClick={onCancel}>
      <span className="glyphicon glyphicon-close" aria-hidden="true" />
    </button>
  </HeaderBase>
);

export default ModalCommonHeader;
