import React from 'react';
import { render } from '@testing-library/react';
import NotificationEnhanced from './Notification.container';

describe('NotificationEnhanced', () => {
  it('Render <NotificationEnhanced/>', () => {
    const defaultProps = {
      type: '',
      classModifier: 'mymodifier',
      id: 'id',
      title: 'title',
      onClose: () => {},
    };
    const { asFragment } = render(<NotificationEnhanced {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
