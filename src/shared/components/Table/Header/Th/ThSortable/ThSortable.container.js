import React from 'react';
import { func, oneOf, shape, string } from 'prop-types';
import { NONE, DESCENDING, ASCENDING } from '../../../constants';
import ThSortable from './ThSortable';

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

export const SortingIcon = ({ order, orderIconsFn = orderIcons }) => (
  <span className={`af-btn__icon af-btn__icon--table-sorting glyphicon glyphicon-${orderIconsFn(order)}`} />
);

export const setClassModifierActive = ({ classModifier, isActive }) => (isActive ? `${classModifier} active` : classModifier);

const ThSortableContainer = ({ classModifier, field, onSort, sorting, toggleSortingFn, setSortingIconFn, setClassModifierActiveFn, ...rest }) => {
  const { order, field: fieldActive } = sorting;
  const isActive = fieldActive === field;
  const sortBy = toggleSortingFn({ field, sorting });
  const sort = () => onSort(sortBy);
  const newClassModifier = setClassModifierActiveFn({ classModifier, isActive });
  return <ThSortable {...rest} classModifier={newClassModifier} sort={sort} sortingIcon={<SortingIcon order={isActive ? order : undefined} />} />;
};

const ThSortableContainerPropTypes = {
  field: string.isRequired,
  onSort: func,
  sorting: shape({
    field: string,
    order: oneOf([NONE, ASCENDING, DESCENDING]),
  }).isRequired,
  toggleSortingFn: func,
  setSortingIconFn: func,
  setClassModifierActiveFn: func,
  classModifier: string,
};

const ThSortableContainerDefaultProps = {
  toggleSortingFn: toggleSorting,
  setClassModifierActiveFn: setClassModifierActive,
  classModifier: 'sortable',
};

ThSortableContainer.propTypes = ThSortableContainerPropTypes;
ThSortableContainer.defaultProps = ThSortableContainerDefaultProps;

export default ThSortableContainer;
