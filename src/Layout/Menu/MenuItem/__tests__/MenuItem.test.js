import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import { MenuItem, ActionElt } from '../MenuItem';

describe('<MenuItem/>', () => {
  it('Render <Menu/>', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<MenuItem />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <Menu/> with children createMenuFn to be called', () => {
    const Child = () => <p>Child</p>;
    const createMenuMock = jest.fn().mockReturnValue(<Child />);

    const { asFragment } = renderWithWrapperStaticRouter(
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
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('<ActionElt/>', () => {
  it('Render <ActionElt/> with Link When url is defined', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ActionElt url="/members" label="withlink" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <ActionElt/> with Link When url is defined', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<ActionElt label="nolink" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
