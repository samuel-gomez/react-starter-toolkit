import { Button } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import { MouseEventHandler, ReactNode } from 'react';

export type TModalCommonFooter = {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  cancelLabel?: ReactNode;
  confirmLabel?: ReactNode;
  hasErrors?: boolean;
  confirmClassModifier?: string;
  cancelClassModifier?: string;
};

const ModalCommonFooter = ({
  onSubmit,
  onCancel,
  cancelLabel = 'Annuler',
  confirmLabel = 'Confirmer',
  hasErrors = false,
  confirmClassModifier = 'success',
  cancelClassModifier = 'reverse',
}: TModalCommonFooter) => (
  <Modal.Footer>
    {onCancel && (
      <Button className="btn af-btn" onClick={onCancel} classModifier={cancelClassModifier}>
        <span className="af-btn__text">{cancelLabel}</span>
      </Button>
    )}
    {onSubmit && (
      <Button disabled={!!hasErrors} className="btn af-btn" classModifier={`hasiconRight ${confirmClassModifier}`} type="button" onClick={onSubmit}>
        <span className="af-btn__text">{confirmLabel}</span>
        <i className="glyphicon glyphicon-arrowthin-right" />
      </Button>
    )}
  </Modal.Footer>
);

export default ModalCommonFooter;
