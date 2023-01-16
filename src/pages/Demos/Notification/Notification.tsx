import dracula from 'prism-react-renderer/themes/dracula';
import { LiveProvider, LiveEditor } from 'react-live';
import Button from '@axa-fr/react-toolkit-button';
import { Accordion, CollapseCard } from '@axa-fr/react-toolkit-collapse';
import Layout, { TLayoutPage } from 'Layout';
import LiveCode from 'shared/components/LiveCode';
import { TITLE_BAR, TITLE } from './constants';
import { TReturnUseNotify } from './Notification.hook';

const scope = { Button };

const code = `
/* HOOK Example (this works because the App component use the NotificationContext ) */
const useNotify = ({  useContextFn = useContext, NotificationContextObj = NotificationContext }) => {
  const { addNotification } = useContextFn(NotificationContextObj);

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

type TNotificationPage = TLayoutPage & TReturnUseNotify;

const NotificationPage = ({ notifyError, notifySuccess, notifyWarning, titleBar = TITLE_BAR, title = TITLE }: TNotificationPage) => (
  <Layout propsTitle={{ title: titleBar }}>
    <h1 className="af-title--content">{title}</h1>
    <Accordion>
      <CollapseCard id="collapse-hook" key="hook" isOpen={false}>
        <CollapseCard.Header key="hook-header">Hook example</CollapseCard.Header>
        <CollapseCard.Body key="hook-body">
          <LiveProvider theme={dracula} code={code} scope={scope}>
            <LiveEditor style={{ fontSize: '12px' }} />
          </LiveProvider>
        </CollapseCard.Body>
      </CollapseCard>
      <>
        {Object.entries({
          error: { notifyError, code: codeError, isOpen: true, title: 'Error notification' },
          success: { notifySuccess, code: codeSuccess, isOpen: true, title: 'Success notification' },
          warning: { notifyWarning, code: codeWarning, isOpen: true, title: 'Warning notification' },
        }).map(([key, { isOpen, title: titleCollapse, code: codeCollapse, ...rest }]) => (
          <CollapseCard id={`collapse-${key}`} key={key} isOpen={isOpen}>
            <CollapseCard.Header key={`${key}-header`}>{titleCollapse}</CollapseCard.Header>
            <CollapseCard.Body key={`${key}-body`}>
              <LiveCode
                code={codeCollapse}
                scope={{
                  ...scope,
                  ...rest,
                }}
              />
            </CollapseCard.Body>
          </CollapseCard>
        ))}
      </>
    </Accordion>
  </Layout>
);

export default NotificationPage;
