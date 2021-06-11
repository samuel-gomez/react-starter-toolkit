import React from 'react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  menu: () => {},
};
describe('<Dashboard page/>', () => {
  it('Renders Dashboard page component without crashing', () => {
    const { asFragment } = render(<Dashboard {...defaultProps} />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
