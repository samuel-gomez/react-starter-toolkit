import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from './NotFound.component';

const wrapper = ({ children }) => <StaticRouter context={{}}>{children}</StaticRouter>;

describe('<NotFound page/>', () => {
  it('Renders NotFound page component without crashing', () => {
    const { asFragment } = render(<NotFound />, { wrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
