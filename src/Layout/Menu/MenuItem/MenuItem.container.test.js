import React from 'react';
import { render, act } from '@testing-library/react';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import withWrapperEnvAndAuth from 'shared/hoc/withWrapperEnvAndAuth';
import MenuItemEnhanced from './MenuItem.container';

const MenuEnhancedWithEnvAndAuth = withWrapperEnvAndAuth(MenuItemEnhanced);

describe('<MenuItemEnhanced/>', () => {
  it('Render <Menu/>', async () => {
    await act(async () => {
      const { asFragment } = render(<MenuEnhancedWithEnvAndAuth />, { wrapper: WrapperStaticRouter });
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
