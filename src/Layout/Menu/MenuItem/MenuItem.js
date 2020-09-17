import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavBarItem } from '@axa-fr/react-toolkit-all';

export const ActionElt = ({ url, label }) =>
  url ? (
    <Link className="af-nav__link" to={url}>
      {label}
    </Link>
  ) : (
    <span className="af-nav__link">{label}</span>
  );

export const MenuItem = ({ classModifier, className, children, url, label, ariaHaspopup, ariaExpanded, ariaLabel, createMenuFn, ...rest }) => (
  <NavBarItem
    className={className}
    classModifier={classModifier}
    actionElt={ActionElt({ url, label })}
    aria-haspopup={ariaHaspopup}
    aria-expanded={ariaExpanded}
    aria-label={ariaLabel}
    {...rest}
  >
    {children && createMenuFn(children)}
  </NavBarItem>
);

export const MenuItemPropTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
};

export const MenuItemDefaultProps = {
  url: null,
  label: '',
};

MenuItem.propTypes = MenuItemPropTypes;
MenuItem.defaultProps = MenuItemDefaultProps;

export default MenuItem;
