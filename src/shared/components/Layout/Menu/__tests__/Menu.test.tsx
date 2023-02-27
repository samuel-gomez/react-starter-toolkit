import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { Menu } from '../Menu';
import MENU_ITEMS from '../constants';

describe('<Menu />', () => {
  it('Render <Menu />', () => {
    const onClickFn = jest.fn();
    const { asFragment } = renderWithWrapperStaticRouter(<Menu menuItems={MENU_ITEMS} isVisible onClick={onClickFn} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
