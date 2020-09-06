import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ASCENDING, DESCENDING, NONE } from 'shared/constants';

const orderIcons = {
  [NONE]: 'sorting',
  [ASCENDING]: 'arrow-xs-up',
  [DESCENDING]: 'arrow-xs-down',
};

const propTypes = {
  children: PropTypes.node,
  sort: PropTypes.func,
  order: PropTypes.oneOf([NONE, ASCENDING, DESCENDING]),
  sortable: PropTypes.bool.isRequired,
};

const defaultProps = {
  order: NONE,
  sort: undefined,
  children: null,
};

const TableTh = props => {
  const { children, sort, order, sortable } = props;
  let sortingIcon;
  if (sortable) {
    const iconSuffix = orderIcons[order] || 'sorting';
    sortingIcon = <span className={`af-btn__icon af-btn__icon--table-sorting glyphicon glyphicon-${iconSuffix}`} />;
  }

  return (
    <th
      role={sortable ? 'button' : 'columnheader'}
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
        {sortable && sortingIcon}
      </button>
    </th>
  );
};

TableTh.propTypes = propTypes;
TableTh.defaultProps = defaultProps;

export default TableTh;
