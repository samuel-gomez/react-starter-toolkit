import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import withUser from 'shared/hoc/withUser';
import { Menu } from '../Menu';
import MENU_ITEMS from '../constants';

const MenuWithUser = withUser(Menu);

describe('<Menu/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<MenuWithUser menuItems={MENU_ITEMS} isVisible />);
    expect(asFragment()).toMatchSnapshot();
  });
});
