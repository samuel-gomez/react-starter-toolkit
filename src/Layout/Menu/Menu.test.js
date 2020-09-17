import React from 'react';
import { render } from '@testing-library/react';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import { Menu } from './Menu';
import MENU_ITEMS from './constants';

describe('<Menu/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = render(<Menu menuItems={MENU_ITEMS} isVisible />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
