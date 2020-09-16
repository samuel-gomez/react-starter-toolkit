import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import { Menu } from './Menu';

const location = {
  pathname: '/whatever',
};

const wrapper = ({ children }) => (
  <StaticRouter context={{}}>{children}</StaticRouter>
);

it('1. Renders Menu component without crashing', () => {
  const { asFragment } = render(<Menu location={location} />, { wrapper });
  expect(asFragment()).toMatchSnapshot();
});
