import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation, matchPath } from 'react-router-dom';
import { ToggleButton, Action } from '@axa-fr/react-toolkit-all';
import { Menu, menuItemPropType } from './Menu';
import MENU_ITEMS, { CLASS_BODY_MENU_OPEN } from './constants';

export const setPositionInit = ({ menuItems, pathname, matchPathFn = matchPath }) =>
  menuItems.map((navItem, index) => (pathname === navItem.url ? index : 0)).reduce((accumulator, currentValue) => accumulator + currentValue);

export const setToggleMenu = ({ setIsMenuVisible, isVisible, documentObj = document }) => {
  const { body } = documentObj;
  body.classList.toggle(CLASS_BODY_MENU_OPEN);
  setIsMenuVisible(!isVisible);
};

export const useMenuVisible = (initState = false) => {
  const [isVisible, setIsMenuVisible] = useState(initState);
  return { isVisible, setIsMenuVisible };
};

const MenuEnhanced = ({ menuItems, setPositionInitFn, setToggleMenuFn, useLocationFn, useMenuVisibleFn, ...rest }) => {
  const { pathname } = useLocationFn();
  const initPosition = setPositionInitFn({ menuItems, pathname });
  const { isVisible, setIsMenuVisible } = useMenuVisibleFn();

  const toggleMenu = useCallback(() => setToggleMenuFn({ setIsMenuVisible, isVisible }), [isVisible, setIsMenuVisible, setToggleMenuFn]);

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
  setToggleMenuFn: PropTypes.func,
  useLocationFn: PropTypes.func,
  useMenuVisibleFn: PropTypes.func,
};

export const menuEnhancedDefaultProps = {
  menuItems: MENU_ITEMS,
  setPositionInitFn: setPositionInit,
  setToggleMenuFn: setToggleMenu,
  useLocationFn: useLocation,
  useMenuVisibleFn: useMenuVisible,
};

MenuEnhanced.propTypes = menuEnhancedPropTypes;
MenuEnhanced.defaultProps = menuEnhancedDefaultProps;

export default MenuEnhanced;
