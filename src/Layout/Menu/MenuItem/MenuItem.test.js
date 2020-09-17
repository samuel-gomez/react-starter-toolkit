import React from 'react';
import { render } from '@testing-library/react';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import { MenuItem, ActionElt } from './MenuItem';

describe('<MenuItem/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = render(<MenuItem />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('<ActionElt/>', () => {
  it('Render <ActionElt/> with Link When url is defined', () => {
    const { asFragment } = render(<ActionElt url="/members" label="withlink" />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <ActionElt/> with Link When url is defined', () => {
    const { asFragment } = render(<ActionElt label="nolink" />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});
