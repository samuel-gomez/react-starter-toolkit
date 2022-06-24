import { act } from '@testing-library/react';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import withUser from 'shared/hoc/withUser';
import MenuItemEnhanced from '../MenuItem.container';
import { menuItemsMock } from './MenuItem.mock';

const MenuEnhancedWithUser = withUser(MenuItemEnhanced);

describe('<MenuItemEnhanced/>', () => {
  it('Render <Menu/>', async () => {
    const { asFragment } = renderWithWrapperStaticRouter(<MenuEnhancedWithUser />);
    act(() => expect(asFragment()).toMatchSnapshot());
  });

  it('Render <Menu/> hasChild', async () => {
    const { asFragment } = renderWithWrapperStaticRouter(<MenuEnhancedWithUser>{menuItemsMock}</MenuEnhancedWithUser>);
    act(() => expect(asFragment()).toMatchSnapshot());
  });
});
