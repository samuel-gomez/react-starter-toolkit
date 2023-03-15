import { Alert } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import { ModalCommonHeader, ModalCommonBody, ModalCommonFooter, TReturnUseToggleModal } from 'shared/components/ModalCommon';
import withClassNameModifier, { TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';

/**
 * NOTE: Ce composant est un snippet, il n'est pas utilisé dans la démo
 */

type TModalConfirm = Pick<TReturnUseToggleModal, 'isOpen' | 'onCancel'> & {
  className?: string;
} & TwithClassNameModifier;

const ModalConfirm = withClassNameModifier(
  ({ className, isOpen, onCancel }: TModalConfirm) => (
    <Modal isOpen={isOpen} onOutsideTap={onCancel} className={className}>
      <ModalCommonHeader onCancel={onCancel} title="Validation des informations générales" />
      <ModalCommonBody>
        <Alert classModifier="info" icon="info-sign" title="Vous allez créer un nouvel élément." />
        <p>Confirmez-vous vouloir valider avec les informations suivantes ?</p>
      </ModalCommonBody>
      <ModalCommonFooter cancelLabel="Annuler" onCancel={onCancel} onSubmit={onCancel} confirmLabel="Valider" confirmClassModifier="" />
    </Modal>
  ),
  { defaultClassName: 'af-modal' },
);

export default ModalConfirm;
