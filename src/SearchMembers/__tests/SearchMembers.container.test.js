import React from 'react';
import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import SearchMembersContainer from '../SearchMembers.container';

const defaultProps = {
  header: emptyFunction,
  title: emptyFunction,
  footer: emptyFunction,
  menu: emptyFunction,
  members: [],
  anomaly: null,
  loaderMode: 'none',
  deleteNotification: emptyFunction,
  notifications: [],
  submitSearch: emptyFunction,
};

describe('<SearchMembersContainer/>', () => {
  it('Should render SearchMembersContainer', () => {
    const { asFragment } = render(<SearchMembersContainer {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <SearchMembersContainer /> with one member', () => {
    const { asFragment } = render(
      <SearchMembersContainer
        {...defaultProps}
        members={[
          {
            key: '1',
            name: {
              label: 'nom du membre',
            },
            id: {
              label: '1254689759',
            },
          },
        ]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
