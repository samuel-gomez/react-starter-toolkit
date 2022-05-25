import { useState, useCallback } from 'react';
import { func } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { ToggleButton, Action } from '@axa-fr/react-toolkit-all';
import { Menu, menuItemPropType } from './Menu';
import MENU_ITEMS, { CLASS_BODY_MENU_OPEN } from './constants';

const isNotNull = item => item !== null;

export const setPositionInit = ({ menuItems, pathname, isChildren }) =>
  menuItems
    .map((navItem, index) => {
      const subIndex = navItem.children ? setPositionInit({ menuItems: navItem.children, pathname, isChildren: true }) : undefined;
      if (isChildren) {
        return pathname === navItem.url ? index : null;
      }
      return pathname === navItem.url || subIndex !== undefined ? index : null;
    })
    .find(isNotNull);

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
  setPositionInitFn: func,
  setToggleMenuFn: func,
  useLocationFn: func,
  useMenuVisibleFn: func,
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
