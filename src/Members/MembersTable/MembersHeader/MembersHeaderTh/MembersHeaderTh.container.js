import React from 'react';
import PropTypes from 'prop-types';
import { ASCENDING, DESCENDING, NONE } from 'shared/constants';
import { MembersHeaderThSortable, MembersHeaderTh } from './MembersHeaderTh.component';

export const toggleOrder = order => (order === ASCENDING ? DESCENDING : ASCENDING);

export const setOrder = ({ field, prevField, order, toggleOrderFn = toggleOrder }) => (prevField !== field ? ASCENDING : toggleOrderFn(order));

export const toggleSorting = ({ field, sorting: { field: prevField, order }, setOrderFn = setOrder }) => ({
  field,
  order: setOrderFn({ field, prevField, order }),
});

const orderIcons = (order = NONE) =>
  ({
    [NONE]: 'sorting',
    [ASCENDING]: 'arrow-xs-up',
    [DESCENDING]: 'arrow-xs-down',
  }[order]);

export const MembersHeaderThEnhanced = ({ sortingInfo, field, onSort, sorting, toggleSortingFn, ...rest }) => {
  const sortable = Boolean(field);
  const order = sortingInfo[field];
  const sortBy = toggleSortingFn({ field, sorting });
  const sort = () => onSort(sortBy);

  const computedProps = {
    sortable,
    order,
    sort,
    sortingIcon: sortable ? <span className={`af-btn__icon af-btn__icon--table-sorting glyphicon glyphicon-${orderIcons(order)}`} /> : null,
  };

  return sortable ? <MembersHeaderThSortable {...rest} {...computedProps} /> : <MembersHeaderTh {...rest} />;
};

const MembersHeaderThEnhancedPropTypes = {
  toggleSortingFn: PropTypes.func,
};

const MembersHeaderThEnhancedDefaultProps = {
  toggleSortingFn: toggleSorting,
};

MembersHeaderThEnhanced.propTypes = MembersHeaderThEnhancedPropTypes;
MembersHeaderThEnhanced.defaultProps = MembersHeaderThEnhancedDefaultProps;

export default MembersHeaderThEnhanced;
