import { number, arrayOf, shape } from 'prop-types';
import { NavBar } from '@axa-fr/react-toolkit-all';
import { MenuItemPropTypes, createMenu } from './MenuItem';
import './Menu.scss';

export const Menu = ({ menuItems, initPosition, isVisible, handleClick }) => (
  <NavBar positionInit={initPosition} isVisible={isVisible} onClick={handleClick}>
    {createMenu(menuItems)}
  </NavBar>
);

export const menuItemPropType = arrayOf(
  shape({
    ...MenuItemPropTypes,
  }),
);

export const MenuPropTypes = {
  menuItems: menuItemPropType.isRequired,
  initPosition: number,
};

export const MenuDefaultProps = {
  initPosition: 0,
};

Menu.propTypes = MenuPropTypes;
Menu.defaultProps = MenuDefaultProps;
