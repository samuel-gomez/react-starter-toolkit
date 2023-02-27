import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import NotificationsContainer from '../Notifications.container';

describe('NotificationsContainer', () => {
  const NotificationsCmpt = jest.fn();
  NotificationsCmpt.mockImplementation(() => <>NotificationsCmpt</>);
  const defaultProps = {
    deleteNotification: emptyFunction,
    NotificationsCmpt,
  };

  it('Render <NotificationsContainer/>', () => {
    const { getByText } = render(<NotificationsContainer {...defaultProps} />);
    expect(getByText('NotificationsCmpt')).toBeInTheDocument();
    expect(NotificationsCmpt).toHaveBeenCalledWith(
      {
        className: 'af-notifications',
        deleteNotification: emptyFunction,
        notifications: [],
      },
      {},
    );
  });

  it('Render <NotificationsContainer/> with notifications', () => {
    const customProps = {
      ...defaultProps,
      className: 'myclass',
      notifications: [{ id: 'id', label: 'label', onClose: emptyFunction }],
    };
    const { getByText } = render(<NotificationsContainer {...customProps} />);
    expect(getByText('NotificationsCmpt')).toBeInTheDocument();
    expect(NotificationsCmpt).toHaveBeenCalledWith(
      {
        className: 'myclass myclass--open',
        deleteNotification: emptyFunction,
        notifications: [
          {
            id: 'id',
            onClose: emptyFunction,
            label: 'label',
          },
        ],
      },
      {},
    );
  });
});
