import React from 'react';
import PropTypes from 'prop-types';
import ThSortable from './ThSortable';

export const toggleOrder = (order, headersOrderCt) => (order === headersOrderCt.ASCENDING ? headersOrderCt.DESCENDING : headersOrderCt.ASCENDING);

export const setOrder = ({ field, prevField, order, headersOrderCt, toggleOrderFn = toggleOrder }) =>
  prevField !== field ? headersOrderCt.ASCENDING : toggleOrderFn(order, headersOrderCt);

export const toggleSorting = ({ field, sorting: { field: prevField, order }, headersOrderCt, setOrderFn = setOrder }) => ({
  field,
  order: setOrderFn({ field, prevField, order, headersOrderCt }),
});

const orderIcons = ({ NONE, ASCENDING, DESCENDING }, order = NONE) =>
  ({
    [NONE]: 'sorting',
    [ASCENDING]: 'arrow-xs-up',
    [DESCENDING]: 'arrow-xs-down',
  }[order]);

export const SortingIcon = ({ order, headersOrderCt, orderIconsFn = orderIcons }) => (
  <span className={`af-btn__icon af-btn__icon--table-sorting glyphicon glyphicon-${orderIconsFn(headersOrderCt, order)}`} />
);

export const setClassModifierActive = ({ classModifier, isActive }) => (isActive ? `${classModifier} active` : classModifier);

const ThSortableContainer = ({
  classModifier,
  field,
  onSort,
  sorting,
  toggleSortingFn,
  setSortingIconFn,
  setClassModifierActiveFn,
  headersOrderCt,
  ...rest
}) => {
  const { order, field: fieldActive } = sorting;
  const isActive = fieldActive === field;
  const sortBy = toggleSortingFn({ field, sorting, headersOrderCt });
  const sort = () => onSort(sortBy);
  const newClassModifier = setClassModifierActiveFn({ classModifier, isActive });
  return (
    <ThSortable
      {...rest}
      classModifier={newClassModifier}
      sort={sort}
      sortingIcon={<SortingIcon order={isActive ? order : undefined} headersOrderCt={headersOrderCt} />}
    />
  );
};

const ThSortableContainerPropTypes = {
  field: PropTypes.string.isRequired,
  onSort: PropTypes.func,
  sorting: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  toggleSortingFn: PropTypes.func,
  setSortingIconFn: PropTypes.func,
  setClassModifierActiveFn: PropTypes.func,
  classModifier: PropTypes.string,
};

const ThSortableContainerDefaultProps = {
  toggleSortingFn: toggleSorting,
  setClassModifierActiveFn: setClassModifierActive,
  classModifier: 'sortable',
};

ThSortableContainer.propTypes = ThSortableContainerPropTypes;
ThSortableContainer.defaultProps = ThSortableContainerDefaultProps;

export default ThSortableContainer;
