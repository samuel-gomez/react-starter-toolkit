import React from 'react';
import { render } from '@testing-library/react';
import Members from './Members';

const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  members: [],
  anomaly: null,
  loaderMode: 'none',
  deleteNotification: () => {},
  notifications: [],
};

describe('<Members/>', () => {
  it('Should render Members', () => {
    const { asFragment } = render(<Members {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('<Members/> with <Notification />', () => {
  it('Should render Members with <Notification /> when have notifications', () => {
    const { asFragment, container } = render(
      <Members {...defaultProps} notifications={[{ id: '001', code: 'notif', title: 'title', onClose: () => {} }]} />,
    );

    expect(container.querySelector('.af-alert.af-alert--notification.af-alert--error')).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
