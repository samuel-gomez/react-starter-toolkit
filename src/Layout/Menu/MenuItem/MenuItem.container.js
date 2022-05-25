import { func } from 'prop-types';
import Authorize from 'shared/components/Authorize';
import { MenuItem } from './MenuItem';

export const createMenu = menuItems => menuItems.map(menuItem => <MenuItemEnhanced key={menuItem.label} {...menuItem} />);

const MenuItemEnhanced = ({ url, label, children, classModifier, authorized, hasFocus, index, tabIndex, createMenuFn }) => {
  const newClassModifier = [classModifier, children ? 'haschild' : ''].join(' ');
  const ariaProps = url ? { ariaHaspopup: 'true', ariaExpanded: 'false', ariaLabel: label } : {};

  return (
    <Authorize authorized={authorized}>
      <MenuItem
        hasFocus={hasFocus}
        index={index}
        tabIndex={tabIndex}
        createMenuFn={createMenuFn}
        url={url}
        label={label}
        classModifier={newClassModifier}
        {...ariaProps}
      >
        {children}
      </MenuItem>
    </Authorize>
  );
};

export const menuEnhancedPropTypes = {
  createMenuFn: func,
};

export const menuEnhancedDefaultProps = {
  createMenuFn: createMenu,
};

MenuItemEnhanced.propTypes = menuEnhancedPropTypes;
MenuItemEnhanced.defaultProps = menuEnhancedDefaultProps;

export default MenuItemEnhanced;
