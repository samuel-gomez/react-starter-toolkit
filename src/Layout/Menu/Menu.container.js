import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation, matchPath } from 'react-router-dom';
import { ToggleButton, Action } from '@axa-fr/react-toolkit-all';
import { Menu, menuItemPropType } from './Menu';
import MENU_ITEMS, { CLASS_BODY_MENU_OPEN } from './constants';

export const setPositionInit = ({ menuItems, pathname, matchPathFn = matchPath }) =>
  menuItems
    .map((navItem, index) =>
      matchPathFn(pathname, {
        path: navItem.url,
      })
        ? index
        : 0,
    )
    .reduce((accumulator, currentValue) => accumulator + currentValue);

const MenuEnhanced = ({ menuItems, setPositionInitFn, ...rest }) => {
  const { pathname } = useLocation();
  const initPosition = setPositionInitFn({ menuItems, pathname });
  const [isVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = useCallback(() => {
    const { body } = document;
    body.classList.toggle(CLASS_BODY_MENU_OPEN);
    setIsMenuVisible(!isVisible);
  }, [isVisible]);

  return (
    <>
      <Menu {...rest} menuItems={menuItems} isVisible={isVisible} handleClick={toggleMenu} initPosition={initPosition} />
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
  setPositionInitFn: PropTypes.func,
};

export const menuEnhancedDefaultProps = {
  menuItems: MENU_ITEMS,
  setPositionInitFn: setPositionInit,
};

MenuEnhanced.propTypes = menuEnhancedPropTypes;
MenuEnhanced.defaultProps = menuEnhancedDefaultProps;

export default MenuEnhanced;
