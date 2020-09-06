import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ASCENDING, DESCENDING, NONE } from 'shared/constants';

export const MembersHeaderThSortable = ({ children, sort, order, sortable, sortingIcon }) => (
  <th
    role="button"
    onClick={sort}
    className={classNames('af-table__th', {
      'af-table__th--sortable': Boolean(sortable),
      'af-table__th--active': Boolean(order !== NONE),
    })}
  >
    <button
      type="button"
      className={classNames('af-btn', {
        'af-btn--table-sorting': Boolean(sortable),
        'af-btn--table-sorting--active': Boolean(order !== NONE),
      })}
    >
      {children}
      {sortingIcon}
    </button>
  </th>
);

const MembersHeaderThSortablePropTypes = {
  children: PropTypes.node,
  sort: PropTypes.func,
  order: PropTypes.oneOf([NONE, ASCENDING, DESCENDING]),
  sortable: PropTypes.bool.isRequired,
};

const MembersHeaderThSortableDefaultProps = {
  order: NONE,
  sort: undefined,
  children: null,
};

MembersHeaderThSortable.propTypes = MembersHeaderThSortablePropTypes;
MembersHeaderThSortable.defaultProps = MembersHeaderThSortableDefaultProps;

export const MembersHeaderTh = ({ children }) => (
  <th className="af-table__th" role="columnheader">
    {children}
  </th>
);
