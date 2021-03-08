import React from 'react';
import PropTypes from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';

const ThSortable = WithClassNameModifier(({ className, children, sort, sortingIcon }) => (
  <th role="button" onClick={sort} className={className}>
    {children}
    {sortingIcon}
  </th>
));

const ThSortablePropTypes = {
  sort: PropTypes.func,
  className: PropTypes.string,
  sortingIcon: PropTypes.node,
  children: PropTypes.node,
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
