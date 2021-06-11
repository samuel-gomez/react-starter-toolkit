import React from 'react';
import { WrapperStaticRouter, emptyFunction } from 'shared/testsUtils';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard.container';

const defaultProps = {
  header: emptyFunction,
  title: emptyFunction,
  footer: emptyFunction,
  menu: emptyFunction,
};
describe('<Dashboard page/>', () => {
  it('Renders Dashboard page component without crashing', () => {
    const { asFragment } = render(<Dashboard {...defaultProps} />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
