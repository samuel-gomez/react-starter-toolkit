import Notification, { EType, TNotification } from './Notification';

type TNotificationContainer = TNotification & {
  NotificationCmpt?: typeof Notification;
};

const NotificationContainer = ({ classModifier = '', type = EType.error, NotificationCmpt = Notification, ...rest }: TNotificationContainer) => {
  const newClassModifier = [type, classModifier].join(' ').trim();
  return <NotificationCmpt {...rest} type={type} classModifier={newClassModifier} />;
};

export default NotificationContainer;
