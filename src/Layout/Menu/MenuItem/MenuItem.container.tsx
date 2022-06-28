import Authorize from 'shared/components/Authorize';
import { MenuItem } from './MenuItem';
import type { TMenuItemEnhanced, TMenuItemBase } from './MenuItem.d';

export const createMenu = (menuItems: TMenuItemBase[], onClick?: (event: React.MouseEvent<HTMLElement>) => void) =>
  menuItems.map(menuItem => <MenuItemEnhanced key={menuItem.label} {...menuItem} onClick={onClick} />);

const MenuItemEnhanced = ({ authorized, url, label, children, classModifier, createMenuFn = createMenu, ...props }: TMenuItemEnhanced) => {
  const newClassModifier = [classModifier, children ? 'haschild' : ''].join(' ').trim();
  const ariaProps = url ? { ariaHaspopup: 'true', ariaExpanded: 'false', ariaLabel: label } : {};

  return (
    <Authorize authorized={authorized}>
      <MenuItem {...props} createMenuFn={createMenuFn} url={url} label={label} classModifier={newClassModifier} {...ariaProps}>
        {children}
      </MenuItem>
    </Authorize>
  );
};

export default MenuItemEnhanced;
