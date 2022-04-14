import React from 'react';
import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import SearchMembersContainer from '../SearchMembers.container';

const defaultProps = {
  members: [],
  anomaly: null,
  loaderMode: 'none',
  deleteNotification: emptyFunction,
  notifications: [],
  submitSearch: emptyFunction,
};

describe('<SearchMembersContainer/>', () => {
  it('Should render SearchMembersContainer', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<SearchMembersContainer {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <SearchMembersContainer /> with one member', () => {
    const { asFragment } = renderWithWrapperStaticRouter(
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
