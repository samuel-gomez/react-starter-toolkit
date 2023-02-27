import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import NotificationContainer from '../Notification.container';

describe('<NotificationContainer/>', () => {
  const useNotifyErrorFn = jest.fn();
  const NotificationCmpt = jest.fn();

  it('Should call useNotifyErrorFn when render NotificationContainer', () => {
    useNotifyErrorFn.mockReturnValue({ notifyError: emptyFunction, notifySuccess: emptyFunction, notifyWarning: emptyFunction });

    renderWithWrapperStaticRouter(<NotificationContainer useNotifyErrorFn={useNotifyErrorFn} />);

    expect(useNotifyErrorFn).toHaveBeenCalled();
  });

  it('Should call NotificationCmpt with notification functions when render NotificationContainer', () => {
    NotificationCmpt.mockReturnValue('NotificationCmpt');

    renderWithWrapperStaticRouter(<NotificationContainer useNotifyErrorFn={useNotifyErrorFn} NotificationCmpt={NotificationCmpt} />);

    expect(NotificationCmpt).toHaveBeenCalledWith(
      {
        notifyError: emptyFunction,
        notifySuccess: emptyFunction,
        notifyWarning: emptyFunction,
      },
      {},
    );
  });

  it('Should call NotificationCmpt when render NotificationContainer', () => {
    NotificationCmpt.mockReturnValue('NotificationCmpt');

    renderWithWrapperStaticRouter(<NotificationContainer NotificationCmpt={NotificationCmpt} />);

    expect(NotificationCmpt).toHaveBeenCalled();
  });
});
