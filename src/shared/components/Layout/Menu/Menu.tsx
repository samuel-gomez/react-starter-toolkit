import { NavBar } from '@axa-fr/react-toolkit-layout-header';
import { createMenu, TMenuItemBase } from './MenuItem';
import './Menu.scss';

export type TMenu = {
  menuItems?: TMenuItemBase[];
  createMenuFn?: typeof createMenu;
  isVisible: boolean;
  onClick: () => void;
  positionInit?: number;
  fullScreen?: boolean;
};

export const Menu = ({ fullScreen, menuItems, createMenuFn = createMenu, onClick, ...navBarProps }: TMenu) => (
  <section className={`af-menu${fullScreen ? ' af-menu--fullscreen' : ''}`}>
    <NavBar {...navBarProps} onClick={onClick}>
      {menuItems && createMenuFn(menuItems, onClick)}
    </NavBar>
  </section>
);
