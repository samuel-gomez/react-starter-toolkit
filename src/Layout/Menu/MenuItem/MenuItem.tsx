import { Link } from 'react-router-dom';
import { NavBarItem } from '@axa-fr/react-toolkit-all';
import type { TActionElt, TMenuItem } from './MenuItem.d';

export const ActionElt = ({ url, label }: TActionElt) =>
  url ? (
    <Link className="af-nav__link" to={url}>
      {label}
    </Link>
  ) : (
    <span className="af-nav__link">{label}</span>
  );

export const MenuItem = ({ children, basePath, url, label, ariaHaspopup, ariaExpanded, ariaLabel, createMenuFn, onClick, ...rest }: TMenuItem) => (
  <NavBarItem
    {...rest}
    actionElt={ActionElt({ url, label })}
    onClick={onClick}
    aria-haspopup={ariaHaspopup}
    aria-expanded={ariaExpanded}
    aria-label={ariaLabel}
  >
    {children && createMenuFn?.(children, onClick, basePath)}
  </NavBarItem>
);

export default MenuItem;
