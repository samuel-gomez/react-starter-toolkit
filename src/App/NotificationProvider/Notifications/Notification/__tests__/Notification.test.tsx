import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import Notification, { EType } from '../Notification';

describe('Notifications', () => {
  const defaultProps = {
    id: 'id',
    title: 'title',
    onClose: emptyFunction,
  };
  it('Render <Notification/> with required props', () => {
    const { asFragment } = render(<Notification {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <Notification/> with all props', () => {
    const allProps = {
      ...defaultProps,
      detail: 'detail custom',
      classModifier: 'myclass',
      type: EType.success,
    };
    const { asFragment } = render(<Notification {...allProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
