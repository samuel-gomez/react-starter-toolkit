import { bool, func, string } from 'prop-types';
import { Alert } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import { ModalCommonHeader, ModalCommonBody, ModalCommonFooter } from 'shared/components/ModalCommon';

const ModalConfirm = ({ classModifier, isOpen, onCancel }) => (
  <Modal isOpen={isOpen} onOutsideTap={onCancel} classModifier={classModifier}>
    <ModalCommonHeader onCancel={onCancel} title="Validation des informations générales" />
    <ModalCommonBody>
      <Alert classModifier="info" icon="info-sign" title="Vous allez créer un nouvel élément." />
      <p>Confirmez-vous vouloir valider avec les informations suivantes ?</p>
    </ModalCommonBody>
    <ModalCommonFooter cancelLabel="Annuler" onCancel={onCancel} onSubmit={onCancel} confirmLabel="Valider" confirmClassModifier="" />
  </Modal>
);

export const ModalConfirmPropTypes = {
  isOpen: bool.isRequired,
  onCancel: func.isRequired,
  classModifier: string,
};

export const ModalConfirmDefaultProps = {
  classModifier: 'lg',
};

ModalConfirm.propTypes = ModalConfirmPropTypes;
ModalConfirm.defaultProps = ModalConfirmDefaultProps;

export default ModalConfirm;
