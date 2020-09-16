import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from './MenuItem';

export const createMenu = menuItems => menuItems.map(menuItem => <MenuItemEnhanced key={menuItem.label} {...menuItem} />);

const MenuItemEnhanced = ({ url, label, children, classModifier, ...rest }) => {
  const newClassModifier = [classModifier, children ? 'haschild' : ''].join(' ');
  const ariaProps = url ? { ariaHaspopup: 'true', ariaExpanded: 'false', ariaLabel: label } : {};

  return (
    <MenuItem {...rest} url={url} label={label} classModifier={newClassModifier} {...ariaProps}>
      {children}
    </MenuItem>
  );
};

export const menuEnhancedPropTypes = {
  createMenuFn: PropTypes.func,
};

export const menuEnhancedDefaultProps = {
  createMenuFn: createMenu,
};

MenuItemEnhanced.propTypes = menuEnhancedPropTypes;
MenuItemEnhanced.defaultProps = menuEnhancedDefaultProps;

export default MenuItemEnhanced;
