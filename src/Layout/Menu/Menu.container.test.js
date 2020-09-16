import React from 'react';
import { render } from '@testing-library/react';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import MenuEnhanced, { setPositionInit } from './Menu.container';

describe('<MenuEnhanced/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = render(<MenuEnhanced />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('setPositionInit', () => {
  const menuItems = [
    {
      label: 'lien 1',
      url: '/',
    },
    {
      label: 'lien 2',
      url: '/lien2',
    },
  ];
  it('Should return position 0  when pathname = first item url', () => {
    const result = setPositionInit({ menuItems, pathname: '/' });
    expect(result).toEqual(0);
  });
  it('Should return position 1  when pathname = second item url', () => {
    const result = setPositionInit({ menuItems, pathname: '/lien2' });
    expect(result).toEqual(1);
  });
});
