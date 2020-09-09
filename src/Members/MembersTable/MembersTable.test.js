import React from 'react';
import { render } from '@testing-library/react';
import MembersTable from './MembersTable';

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

describe('<MembersTable/>', () => {
  it('Should render MembersTable', () => {
    const { asFragment } = render(<MembersTable {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain 1 <Table.Tr /> element when array members contains 1 member', () => {
    const { asFragment, container, getByRole } = render(
      <MembersTable
        {...defaultProps}
        members={[
          {
            _id: '00001',
            firstname: 'Samuel',
            lastname: 'Gomez',
            birthdate: '1985-10-20T13:44:20.540000',
            created: '2020-10-20T13:44:20.540000',
            sexe: 'M',
          },
        ]}
      />,
    );
    expect(getByRole('table')).not.toBeNull();
    expect(container.querySelector('.af-alert.af-alert--notification.af-alert--error')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
