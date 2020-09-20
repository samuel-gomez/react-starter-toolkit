import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WrapperStaticRouter from 'shared/components/WrapperStaticRouter';
import withWrapperEnvAndAuth from 'shared/hoc/withWrapperEnvAndAuth';
import MenuEnhanced, { setPositionInit, setToggleMenu } from './Menu.container';
import MENU_ITEMS, { CLASS_BODY_MENU_OPEN } from './constants';

const MenuEnhancedWithEnvAndAuth = withWrapperEnvAndAuth(MenuEnhanced);

describe('<MenuEnhanced/>', () => {
  it('Render <Menu/>', async () => {
    await act(async () => {
      const { asFragment } = render(<MenuEnhancedWithEnvAndAuth menuItems={MENU_ITEMS} />, { wrapper: WrapperStaticRouter });
      expect(asFragment()).toMatchSnapshot();
    });
  });
  it('Should call toggle class body When click on button', async () => {
    await act(async () => {
      render(<MenuEnhancedWithEnvAndAuth menuItems={MENU_ITEMS} />, { wrapper: WrapperStaticRouter });
      fireEvent.click(screen.getByTitle('Toggle menu'));
      expect(document.querySelector('body').getAttribute('class')).toEqual('af-menu-open');
    });
  });
});

describe('setPositionInit', () => {
  const menuItems = [
    {
      label: 'lien 1',
      url: '/',
    },
    {
      label: 'lien 2',
      url: '/lien2',
    },
  ];
  it('Should return position 0  when pathname = first item url', () => {
    const result = setPositionInit({ menuItems, pathname: '/' });
    expect(result).toEqual(0);
  });
  it('Should return position 1  when pathname = second item url', () => {
    const result = setPositionInit({ menuItems, pathname: '/lien2' });
    expect(result).toEqual(1);
  });
});

describe('setToggleMenu', () => {
  const setIsMenuVisibleMock = jest.fn();
  const toggleClassMock = jest.fn();
  const documentMock = {
    body: {
      classList: {
        toggle: toggleClassMock,
      },
    },
  };
  it('Should setIsMenuVisible to be called with true and toggleClass to be called with "af-menu-open" when isVisible = false', () => {
    setToggleMenu({ setIsMenuVisible: setIsMenuVisibleMock, isVisible: false, documentObj: documentMock });
    expect(setIsMenuVisibleMock).toBeCalledWith(true);
    expect(toggleClassMock).toBeCalledWith(CLASS_BODY_MENU_OPEN);
  });

  it('Should setIsMenuVisible to be called with false when isVisible = true', () => {
    setToggleMenu({ setIsMenuVisible: setIsMenuVisibleMock, isVisible: true });
    expect(setIsMenuVisibleMock).toBeCalledWith(false);
  });
});
