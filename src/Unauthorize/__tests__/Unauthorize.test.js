import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { render } from '@testing-library/react';
import Unauthorize from '../Unauthorize';

const wrapper = ({ children }) => <StaticRouter context={{}}>{children}</StaticRouter>;

describe('<Unauthorize page/>', () => {
  it('Renders Unauthorize page component without crashing', () => {
    const { asFragment } = render(<Unauthorize />, { wrapper });
    expect(asFragment()).toMatchSnapshot();
  });
});
