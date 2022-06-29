import { createMenu } from './MenuItem.container';

export type TActionElt = {
  url?: string;
  label: string;
};

// le container reçoit les items simples
export type TMenuItemBase = TActionElt & {
  children?: TMenuItemBase[];
  classModifier?: string;
  createMenuFn?: typeof createMenu;
};

// la vue reçoit les items avec des props fournies par le container
export type TMenuItem = TMenuItemBase & {
  ariaHaspopup?: string;
  ariaExpanded?: string;
  ariaLabel?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export type TMenuItemEnhanced = TMenuItemBase & {
  authorized?: string[];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
