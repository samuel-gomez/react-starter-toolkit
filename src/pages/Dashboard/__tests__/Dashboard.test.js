import React from 'react';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Dashboard from '../Dashboard';

const defaultProps = {};
describe('<Dashboard page/>', () => {
  it('Renders Dashboard page component without crashing', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Dashboard {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
