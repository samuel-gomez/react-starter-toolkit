import { ComponentPropsWithoutRef } from 'react';
import { default as TableTk } from '@axa-fr/react-toolkit-table';
import type { Torder } from './ThSortable.container';
import SortingIcon from './SortingIcon';

export type TThSortable = ComponentPropsWithoutRef<typeof TableTk.Th> & {
  sort: () => void;
  order: Torder;
};

const ThSortable = ({ className, children, sort, order, ...thSortableProps }: TThSortable) => (
  <TableTk.Th role="button" onClick={sort} {...thSortableProps}>
    {children}
    <SortingIcon order={order} />
  </TableTk.Th>
);

export default ThSortable;
