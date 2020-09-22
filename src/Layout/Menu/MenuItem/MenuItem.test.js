import React from 'react';
import { render } from '@testing-library/react';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import { MenuItem, ActionElt } from './MenuItem';

describe('<MenuItem/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = render(<MenuItem />, { wrapper: WrapperStaticRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  it.only('Render <Menu/> with children createMenuFn to be called', () => {
    const Child = () => <p>Child</p>;
    const createMenuMock = jest.fn().mockReturnValue(<Child />);

    const { asFragment } = render(
      <MenuItem createMenuFn={createMenuMock}>
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
      </MenuItem>,
      { wrapper: WrapperStaticRouter },
    );
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
