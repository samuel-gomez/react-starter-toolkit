import { Alert } from '@axa-fr/react-toolkit-all';
import { ALERT_ICON } from '../constants';

export enum EType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export type TNotification = {
  id: string;
  title: string;
  onClose: () => void;
  detail?: string;
  classModifier?: string;
  type?: keyof typeof EType;
};

const Notification = ({ id, title, onClose, detail = '', classModifier = '', type = EType.error }: TNotification) => (
  <Alert key={id} icon={ALERT_ICON[type]} title={title} classModifier={`notification ${classModifier}`} onClose={onClose}>
    {detail && <p>{detail}</p>}
  </Alert>
);

export default Notification;
