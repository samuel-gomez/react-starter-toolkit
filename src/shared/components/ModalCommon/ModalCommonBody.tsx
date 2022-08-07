import { ReactNode } from 'react';
import { Tanomaly } from 'shared/types';
import { Alert } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import './ModalCommon.scss';

export type TModalCommonBody = {
  icon?: string;
  title?: ReactNode;
  children?: ReactNode;
  anomaly?: Tanomaly;
};

const ModalCommonBody = ({ icon = '', title = '', anomaly, children }: TModalCommonBody) => (
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

export default ModalCommonBody;
