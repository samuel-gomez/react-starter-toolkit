import React from 'react';
import { render } from '@testing-library/react';
import { WrapperStaticRouter } from 'shared/testsUtils';
import withUser from 'shared/hoc/withUser';
import { Menu } from '../Menu';
import MENU_ITEMS from '../constants';

const MenuWithUser = withUser(Menu);

describe('<Menu/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = render(<MenuWithUser menuItems={MENU_ITEMS} isVisible />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
