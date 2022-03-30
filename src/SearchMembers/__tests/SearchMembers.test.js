import React from 'react';
import { emptyFunction, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import SearchMembers from '../SearchMembers';

const defaultProps = {
  members: [],
  anomaly: null,
  loaderMode: 'none',
  submitSearch: emptyFunction,
};

describe('<SearchMembers/>', () => {
  it('Should render SearchMembers', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<SearchMembers {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <SearchMembers /> with one member', () => {
    const { asFragment } = renderWithWrapperStaticRouter(
      <SearchMembers
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
