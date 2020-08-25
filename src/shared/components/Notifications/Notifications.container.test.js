import React from 'react';
import { render } from '@testing-library/react';
import NotificationsEnhanced from './Notifications.container';

describe('NotificationsEnhanced', () => {
  it('Render <NotificationsEnhanced/>', () => {
    const defaultProps = {
      className: '',
      notifications: [],
      deleteNotification: () => {},
    };
    const { asFragment } = render(<NotificationsEnhanced {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <NotificationsEnhanced/> with notifications', () => {
    const defaultProps = {
      className: '',
      notifications: [{ id: 'id', title: 'label' }],
      deleteNotification: () => {},
    };
    const { asFragment } = render(<NotificationsEnhanced {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
