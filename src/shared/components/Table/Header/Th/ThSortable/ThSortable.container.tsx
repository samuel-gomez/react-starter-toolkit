import { NONE, DESCENDING, ASCENDING } from '../../../constants';
import ThSortable, { TThSortable } from './ThSortable';

export type Torder = typeof ASCENDING | typeof DESCENDING | typeof NONE;
export const toggleOrder = (order: Torder) => (order === ASCENDING ? DESCENDING : ASCENDING);

type TsetOrder = {
  toggleOrderFn?: typeof toggleOrder;
  order: Torder;
  field: string;
  prevField: string;
};

export const setOrder = ({ field, prevField, order, toggleOrderFn = toggleOrder }: TsetOrder) =>
  prevField !== field ? ASCENDING : toggleOrderFn(order);

type Tsorting = {
  field: string;
  order: Torder;
};

type TtoggleSorting = {
  setOrderFn?: typeof setOrder;
  field: string;
  sorting?: Tsorting;
};

export const toggleSorting = ({ field, sorting: { field: prevField, order } = { field, order: NONE }, setOrderFn = setOrder }: TtoggleSorting) => ({
  field,
  order: setOrderFn({ field, prevField, order }) as Torder,
});

type TsetClassModifierActive = {
  classModifier?: string;
  isActive?: boolean;
};

export const setClassModifierActive = ({ classModifier = '', isActive = false }: TsetClassModifierActive) =>
  isActive ? `${classModifier} active` : classModifier;

export type TsetSort = TtoggleSorting & {
  onSort: (arg: ReturnType<typeof toggleSorting>) => void;
};

export const setSort = ({ field, sorting, onSort, toggleSortingFn = toggleSorting }: TsetSort & { toggleSortingFn?: typeof toggleSorting }) => {
  const sortBy = toggleSortingFn({ field, sorting });
  const sort = () => onSort(sortBy);
  return sort;
};

export type TThSortableContainer = Omit<TThSortable, 'sort' | 'sortingIcon' | 'order'> & {
  classModifier?: string;
  ThSortableCmpt?: typeof ThSortable;
  setClassModifierActiveFn?: typeof setClassModifierActive;
  setSortFn?: typeof setSort;
} & TsetSort;

const ThSortableContainer = ({
  field,
  onSort,
  sorting = { field, order: NONE },
  classModifier = 'sortable',
  setClassModifierActiveFn = setClassModifierActive,
  ThSortableCmpt = ThSortable,
  setSortFn = setSort,
  ...rest
}: TThSortableContainer) => {
  const { order, field: fieldActive } = sorting;
  const isActive = fieldActive === field;
  const sort = setSortFn({ field, sorting, onSort });
  const newClassModifier = setClassModifierActiveFn({ classModifier, isActive });

  return <ThSortableCmpt {...rest} classModifier={newClassModifier} sort={sort} order={isActive ? order : NONE} />;
};

export default ThSortableContainer;
