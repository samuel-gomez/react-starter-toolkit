import { ReactNode } from 'react';
import ThSortableContainer, { TsetSort } from './ThSortable';
import Th from './Th';

export type TThContainer = Omit<TsetSort, 'onSort' | 'field'> & {
  ThSortableCmpt?: typeof ThSortableContainer;
  ThCmpt?: typeof Th;
  children?: ReactNode;
  classModifier?: string;
  onSort?: TsetSort['onSort'];
  field?: TsetSort['field'];
};

const ThContainer = ({ field, sorting, onSort, ThSortableCmpt = ThSortableContainer, ThCmpt = Th, ...rest }: TThContainer) =>
  field && onSort ? <ThSortableCmpt {...rest} sorting={sorting} onSort={onSort} field={field} /> : <ThCmpt {...rest} />;

export default ThContainer;
