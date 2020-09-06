//
import React from 'react';
import { ASCENDING, DESCENDING, NONE } from 'shared/constants';
import { MembersHeaderThSortable, MembersHeaderTh } from './MembersHeaderTh.component';

export const toggleOrder = order => (order === ASCENDING ? DESCENDING : ASCENDING);

export const toggleSorting = (field, { field: prevField, order }) => {
  const newOrder = {
    field,
    order: prevField !== field ? ASCENDING : toggleOrder(order),
  };
  return newOrder;
};

const orderIcons = (order = NONE) =>
  ({
    [NONE]: 'sorting',
    [ASCENDING]: 'arrow-xs-up',
    [DESCENDING]: 'arrow-xs-down',
  }[order]);

export const MembersHeaderThEnhanced = ({ sortingInfo, field, onSort, sorting, ...rest }) => {
  const sortable = Boolean(field);
  const order = sortingInfo[field];

  const computedProps = {
    sortable,
    order,
    sort: () => onSort(toggleSorting(field, sorting)),
    sortingIcon: sortable ? <span className={`af-btn__icon af-btn__icon--table-sorting glyphicon glyphicon-${orderIcons(order)}`} /> : null,
  };

  return sortable ? <MembersHeaderThSortable {...rest} {...computedProps} /> : <MembersHeaderTh {...rest} />;
};

export default MembersHeaderThEnhanced;
