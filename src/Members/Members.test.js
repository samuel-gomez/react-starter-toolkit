import React from 'react';
import { render } from '@testing-library/react';
import Members, { MembersItems } from './Members';

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

describe('<MembersItems/>', () => {
  it('Should render MembersItems', () => {
    const { asFragment } = render(<MembersItems {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain 1 <Table.Tr /> element when array members contains 1 member', () => {
    const { asFragment, container, getByRole } = render(
      <MembersItems
        {...defaultProps}
        members={[
          {
            _id: '00001',
            type: 'PP',
            firstname: 'Samuel',
            lastname: 'Gomez',
            birthdate: '1985-10-20T13:44:20.540000',
            created: '2020-10-20T13:44:20.540000',
          },
        ]}
      />,
    );
    expect(getByRole('table')).not.toBeNull();
    expect(container.querySelector('.af-alert.af-alert--notification.af-alert--error')).toBeNull();
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
