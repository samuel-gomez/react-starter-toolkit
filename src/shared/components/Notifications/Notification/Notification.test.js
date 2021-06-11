import React from 'react';
import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import Notification from './Notification';

describe('Notifications', () => {
  it('Render <Notification/>', () => {
    const defaultProps = {
      id: 'id',
      title: 'title',
      detail: 'detail',
      onClose: emptyFunction,
      classModifier: '',
    };
    const { asFragment } = render(<Notification {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
