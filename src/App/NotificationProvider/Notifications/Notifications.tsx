import './Notifications.scss';
import { DEFAULT_CLASS_NOTIFICATION } from './constants';
import Notification, { TNotification } from './Notification';
import { EType } from './Notification';

export type TNotifications = {
  className?: string;
  notifications: TNotification[];
  deleteNotification: (id: string) => void;
};

const Notifications = ({ notifications, deleteNotification, className = DEFAULT_CLASS_NOTIFICATION }: TNotifications) => (
  <aside className={className}>
    {notifications.map(({ id, title, type = EType.error, classModifier, ...rest }) => (
      <Notification {...rest} key={id} id={id} title={title} type={type} classModifier={classModifier} onClose={() => deleteNotification(id)} />
    ))}
  </aside>
);

export default Notifications;
