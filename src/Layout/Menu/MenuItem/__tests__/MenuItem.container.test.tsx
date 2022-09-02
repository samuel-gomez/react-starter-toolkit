import { act } from '@testing-library/react';
import { renderWithWrapperStaticRouter } from 'shared/testsUtils';
import MenuItemEnhanced from '../MenuItem.container';
import { menuItemsMock } from './MenuItem.mock';

describe('<MenuItemEnhanced/>', () => {
  it('Render <Menu/>', async () => {
    const { asFragment } = renderWithWrapperStaticRouter(<MenuItemEnhanced label="test" />);
    act(() => expect(asFragment()).toMatchSnapshot());
  });

  it('Render <Menu/> hasChild', async () => {
    const { asFragment } = renderWithWrapperStaticRouter(<MenuItemEnhanced label="test">{menuItemsMock}</MenuItemEnhanced>);
    act(() => expect(asFragment()).toMatchSnapshot());
  });

  it('Render <Menu/> with', async () => {
    const { asFragment } = renderWithWrapperStaticRouter(<MenuItemEnhanced label="test" basePath="/demos" url="path" />);
    act(() => expect(asFragment()).toMatchSnapshot());
  });
});
