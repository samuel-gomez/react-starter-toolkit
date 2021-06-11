import React from 'react';
import { render } from '@testing-library/react';
import { emptyFunction } from 'shared/testsUtils';
import SearchMembers from './SearchMembers';

const defaultProps = {
  header: emptyFunction,
  title: emptyFunction,
  footer: emptyFunction,
  menu: emptyFunction,
  members: [],
  anomaly: null,
  loaderMode: 'none',
  submitSearch: emptyFunction,
};

describe('<SearchMembers/>', () => {
  it('Should render SearchMembers', () => {
    const { asFragment } = render(<SearchMembers {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <SearchMembers /> with one member', () => {
    const { asFragment } = render(
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
