import React from 'react';
import { render, act } from '@testing-library/react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import withWrapperEnvAndAuth from 'shared/hoc/withWrapperEnvAndAuth';
import { Menu } from './Menu';
import MENU_ITEMS from './constants';

const MenuWithEnvAndAuth = withWrapperEnvAndAuth(Menu);

describe('<Menu/>', () => {
  it('Render <Menu/>', async () => {
    await act(async () => {
      const { asFragment } = render(<MenuWithEnvAndAuth menuItems={MENU_ITEMS} isVisible />, { wrapper: WrapperStaticRouter });
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
