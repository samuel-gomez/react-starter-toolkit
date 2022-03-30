import React from 'react';
import { act } from '@testing-library/react';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import withUser from 'shared/hoc/withUser';
import MenuItemEnhanced from '../MenuItem.container';

const MenuEnhancedWithUser = withUser(MenuItemEnhanced);

describe('<MenuItemEnhanced/>', () => {
  it('Render <Menu/>', async () => {
    await act(async () => {
      const { asFragment } = renderWithWrapperStaticRouter(<MenuEnhancedWithUser />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('Render <Menu/> hasChild', async () => {
    await act(async () => {
      const { asFragment } = renderWithWrapperStaticRouter(
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
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
