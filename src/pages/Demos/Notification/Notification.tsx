import { ReactNode } from 'react';
import dracula from 'prism-react-renderer/themes/dracula';
import { LiveProvider, LiveEditor } from 'react-live';
import { Button, Accordion, CollapseCardBase, CollapseCard } from '@axa-fr/react-toolkit-all';
import Layout, { TLayout } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { TITLE_BAR, TITLE } from './constants';
import { TReturnUseNotify } from './Notification.hook';

const scope = { Button };

const code = `
/* HOOK Example (this works because the App component use the NotificationContext ) */
const useNotify = ({ NotificationContextObj = NotificationContext }) => {
  const { addNotification } = useConNotificationContextObj);

  const notifyError = useCallback(() => {
    addNotification({
      detail: '',
      label: 'Erreur : Contactez le support',
      id: 'idNotifyAnomaly',
    });
  }, [addNotification]);

  const notifySuccess = useCallback(() => {
    addNotification({
      detail: '',
      type: 'success',
      label: 'Success : opération réussie',
      id: 'idNotifySuccess',
    });
  }, [addNotification]);

  const notifyWarning = useCallback(() => {
    addNotification({
      detail: '',
      type: 'danger',
      label: 'Warning : opération not found',
      id: 'idNotifyDanger',
    });
  }, [addNotification]);

  return { notifyError, notifySuccess, notifyWarning };
};
`;

const codeError = `
  <Button classModifier="danger" type="submit" onClick={notifyError} id="btn-danger">
    <span className="af-btn__text">click me</span>
  </Button>
`;

const codeSuccess = `
  <Button classModifier="success" type="submit" onClick={notifySuccess} id="btn-success">
    <span className="af-btn__text">click me</span>
  </Button>
`;

const codeWarning = `
  <Button type="submit" onClick={notifyWarning} id="btn-warning">
    <span className="af-btn__text">click me</span>
  </Button>
`;

type TNotificationPage = TLayout &
  TReturnUseNotify & {
    titleBar?: ReactNode;
    title?: ReactNode;
  };

const NotificationPage = ({ notifyError, notifySuccess, notifyWarning, titleBar = TITLE_BAR, title = TITLE }: TNotificationPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <Accordion>
      <CollapseCardBase id="collapse-hook" key="hook" collapse={false}>
        <CollapseCard.Header key="hook-header">Hook example</CollapseCard.Header>
        <CollapseCard.Body key="hook-body">
          <LiveProvider theme={dracula} code={code} scope={scope}>
            <LiveEditor style={{ fontSize: '12px' }} />
          </LiveProvider>
        </CollapseCard.Body>
      </CollapseCardBase>

      <CollapseCardBase id="collapse-error" key="error" collapse>
        <CollapseCard.Header key="error-header">Error notification</CollapseCard.Header>
        <CollapseCard.Body key="error-body">
          <LiveCode
            code={codeError}
            scope={{
              ...scope,
              notifyError,
            }}
          />
        </CollapseCard.Body>
      </CollapseCardBase>

      <CollapseCardBase id="collapse-success" key="success" collapse>
        <CollapseCard.Header key="error-header">Success notification</CollapseCard.Header>
        <CollapseCard.Body key="error-body">
          <LiveCode
            code={codeSuccess}
            scope={{
              ...scope,
              notifySuccess,
            }}
          />
        </CollapseCard.Body>
      </CollapseCardBase>

      <CollapseCardBase id="collapse-warning" key="warning" collapse>
        <CollapseCard.Header key="error-warning">Warning notification</CollapseCard.Header>
        <CollapseCard.Body key="error-body">
          <LiveCode
            code={codeWarning}
            scope={{
              ...scope,
              notifyWarning,
            }}
          />
        </CollapseCard.Body>
      </CollapseCardBase>
    </Accordion>
  </Layout>
);

export default NotificationPage;
