import React, { useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { ToggleButton, Action } from '@axa-fr/react-toolkit-all';
import { Menu, menuItemPropType } from './Menu';
import MENU_ITEMS from './constants';

const setPositionInit = ({ menuItems, pathname, matchPathFn = matchPath }) =>
  menuItems
    .map((navItem, index) =>
      matchPathFn(pathname, {
        path: navItem.url,
      })
        ? index
        : 0,
    )
    .reduce((accumulator, currentValue) => accumulator + currentValue);

const MenuEnhanced = props => {
  const { menuItems } = props;
  const { pathname } = useLocation();
  const initPosition = setPositionInit({ menuItems, pathname });
  const [isVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => {
    const { body } = document;
    body.classList.toggle('af-menu-open');
    setIsMenuVisible(!isVisible);
  };
  return (
    <>
      <Menu {...props} isVisible={isVisible} handleClick={toggleMenu} initPosition={initPosition} />
      <ToggleButton idControl="mainmenu">
        <Action
          className="btn af-title-bar__mobile-menu af-btn--circle"
          id="togglemenu"
          icon="menu-hamburger"
          title="Toggle menu"
          onClick={toggleMenu}
        />
      </ToggleButton>
    </>
  );
};

export const menuEnhancedPropTypes = {
  menuItems: menuItemPropType,
};

export const menuEnhancedDefaultProps = {
  menuItems: MENU_ITEMS,
};

MenuEnhanced.propTypes = menuEnhancedPropTypes;
MenuEnhanced.defaultProps = menuEnhancedDefaultProps;

export default MenuEnhanced;
