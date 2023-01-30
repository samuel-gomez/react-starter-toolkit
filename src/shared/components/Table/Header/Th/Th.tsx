import { ReactNode } from 'react';
import { default as TableTk } from '@axa-fr/react-toolkit-table';
import ThSortable, { TsetSort } from './ThSortable';

export type TTh = Omit<TsetSort, 'onSort' | 'field'> & {
  ThSortableCmpt?: typeof ThSortable;
  ThCmpt?: typeof TableTk.Th;
  children?: ReactNode;
  classModifier?: string;
  onSort?: TsetSort['onSort'];
  field?: TsetSort['field'];
};

const Th = ({ field, sorting, onSort, ThSortableCmpt = ThSortable, ThCmpt = TableTk.Th, ...rest }: TTh) =>
  field && onSort ? <ThSortableCmpt {...rest} sorting={sorting} onSort={onSort} field={field} /> : <ThCmpt {...rest} />;

export default Th;
