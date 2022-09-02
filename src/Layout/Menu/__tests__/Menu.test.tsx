import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { Menu } from '../Menu';
import MENU_ITEMS from '../constants';

describe('<Menu/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Menu menuItems={MENU_ITEMS} isVisible />);
    expect(asFragment()).toMatchSnapshot();
  });
});
