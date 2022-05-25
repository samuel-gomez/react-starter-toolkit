import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import NotificationsEnhanced from '../Notifications.container';

describe('NotificationsEnhanced', () => {
  it('Render <NotificationsEnhanced/>', () => {
    const defaultProps = {
      className: '',
      notifications: [],
      deleteNotification: emptyFunction,
    };
    const { asFragment } = render(<NotificationsEnhanced {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <NotificationsEnhanced/> with notifications', () => {
    const defaultProps = {
      className: '',
      notifications: [{ id: 'id', title: 'label' }],
      deleteNotification: emptyFunction,
    };
    const { asFragment } = render(<NotificationsEnhanced {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
