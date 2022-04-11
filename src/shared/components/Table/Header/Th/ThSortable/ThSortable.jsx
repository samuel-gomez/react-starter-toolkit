import React from 'react';
import { func, node, string } from 'prop-types';
import WithClassNameModifier from 'shared/hoc/WithClassNameModifier';

const ThSortable = WithClassNameModifier(({ className, children, sort, sortingIcon }) => (
  <th role="button" onClick={sort} className={className}>
    {children}
    {sortingIcon}
  </th>
));

const ThSortablePropTypes = {
  sort: func,
  className: string,
  sortingIcon: node,
  children: node,
};

const ThSortableDefaultProps = {
  sort: null,
  sortingIcon: null,
  children: null,
  className: 'af-table__th',
};

ThSortable.propTypes = ThSortablePropTypes;
ThSortable.defaultProps = ThSortableDefaultProps;

export default ThSortable;
