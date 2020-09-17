import React from 'react';
import { render } from '@testing-library/react';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import MenuItemEnhanced from './MenuItem.container';

describe('<MenuItemEnhanced/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = render(<MenuItemEnhanced />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
