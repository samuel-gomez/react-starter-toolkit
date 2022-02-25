import React from 'react';
import { render, act } from '@testing-library/react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import withUser from 'shared/hoc/withUser';
import MenuItemEnhanced from './MenuItem.container';

const MenuEnhancedWithUser = withUser(MenuItemEnhanced);

describe('<MenuItemEnhanced/>', () => {
  it('Render <Menu/>', async () => {
    await act(async () => {
      const { asFragment } = render(<MenuEnhancedWithUser />, { wrapper: WrapperStaticRouter });
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('Render <Menu/> hasChild', async () => {
    await act(async () => {
      const { asFragment } = render(
        <MenuEnhancedWithUser>
          {[
            {
              label: 'Accueil',
              url: 'accueil',
            },
            {
              label: 'Membres',
              url: 'members',
            },
            {
              label: 'Slash DS',
              url: 'slash',
            },
          ]}
        </MenuEnhancedWithUser>,
        { wrapper: WrapperStaticRouter },
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
