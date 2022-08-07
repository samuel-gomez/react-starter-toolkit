import { ReactNode } from 'react';
import ThSortable, { TsetSort } from './ThSortable';
import Th from './Th';

export type TThContainer = Omit<TsetSort, 'onSort' | 'field'> & {
  ThSortableCmpt?: typeof ThSortable;
  ThCmpt?: typeof Th;
  children?: ReactNode;
  classModifier?: string;
  onSort?: TsetSort['onSort'];
  field?: TsetSort['field'];
};

export const ThContainer = ({ field, sorting, onSort, ThSortableCmpt = ThSortable, ThCmpt = Th, ...rest }: TThContainer) =>
  field && onSort ? <ThSortableCmpt {...rest} sorting={sorting} onSort={onSort} field={field} /> : <ThCmpt {...rest} />;

export default ThContainer;
