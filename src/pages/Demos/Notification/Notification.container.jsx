import Notification from './Notification';
import useNotifyError from './Notification.hook';

const NotificationContainer = ({ useNotifyErrorFn = useNotifyError, NotificationCmpt = Notification, ...rest }) => {
  const { notifyError, notifySuccess, notifyWarning } = useNotifyErrorFn({});

  return <NotificationCmpt {...rest} notifyError={notifyError} notifySuccess={notifySuccess} notifyWarning={notifyWarning} />;
};

export default NotificationContainer;
