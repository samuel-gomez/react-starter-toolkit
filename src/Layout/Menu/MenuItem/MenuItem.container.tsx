import { isEmpty } from 'lodash';
import Authorize from 'shared/components/Authorize';
import { MenuItem } from './MenuItem';
import type { TMenuItemEnhanced, TMenuItemBase } from './MenuItem.d';

export const createMenu = (menuItems: TMenuItemBase[], onClick?: (event: React.MouseEvent<HTMLElement>) => void, basePath?: string) =>
  menuItems.map(menuItem => (
    <MenuItemEnhanced key={menuItem.label} basePath={basePath} {...menuItem} onClick={onClick} classModifierItem={menuItem.classModifierItem} />
  ));

const MenuItemEnhanced = ({
  authorized,
  url,
  label,
  classModifier,
  children,
  basePath,
  classModifierItem,
  createMenuFn = createMenu,
  ...props
}: TMenuItemEnhanced) => {
  const newClassModifier = [classModifier, classModifierItem, children ? 'haschild' : ''].join(' ').trim();
  const ariaProps = url ? { ariaHaspopup: 'true', ariaExpanded: 'false', ariaLabel: label } : {};
  const newUrl = !isEmpty(basePath) && !isEmpty(url) ? `${basePath}/${url}` : url;

  return (
    <Authorize authorized={authorized}>
      <MenuItem {...props} basePath={basePath} createMenuFn={createMenuFn} url={newUrl} label={label} classModifier={newClassModifier} {...ariaProps}>
        {children}
      </MenuItem>
    </Authorize>
  );
};

export default MenuItemEnhanced;
