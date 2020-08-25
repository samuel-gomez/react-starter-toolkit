import React from 'react';
import { render } from '@testing-library/react';
import Notification from './Notification';

describe('Notifications', () => {
  it('Render <Notification/>', () => {
    const defaultProps = {
      id: 'id',
      title: 'title',
      detail: 'detail',
      onClose: () => {},
      classModifier: '',
    };
    const { asFragment } = render(<Notification {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
