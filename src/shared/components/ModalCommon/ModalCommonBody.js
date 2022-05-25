import { string, shape, number, node } from 'prop-types';
import { Alert } from '@axa-fr/react-toolkit-all';
import Modal from '@axa-fr/react-toolkit-modal-default';
import './ModalCommon.scss';

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

const propTypes = {
  icon: string,
  anomaly: shape({
    code: number,
    detail: string,
    label: string,
  }),
  title: node,
  children: node,
};

const defaultProps = {
  anomaly: null,
  title: '',
  children: null,
  icon: '',
};

ModalCommonBody.propTypes = propTypes;
ModalCommonBody.defaultProps = defaultProps;

export default ModalCommonBody;
