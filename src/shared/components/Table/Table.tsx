import { ReactNode, ComponentPropsWithoutRef } from 'react';
import { default as TableTk } from '@axa-fr/react-toolkit-table';
import Body, { TBody } from './Body';
import Header, { THeader } from './Header';

export type TTable = THeader &
  TBody & {
    childrenHeader?: ReactNode;
    className?: string;
  } & ComponentPropsWithoutRef<typeof TableTk>;

const Table = ({ onSort, sorting, headers, items, childrenHeader, ...rest }: TTable) => (
  <TableTk {...rest}>
    <Header headers={headers} onSort={onSort} sorting={sorting}>
      {childrenHeader}
    </Header>
    <Body items={items} />
  </TableTk>
);

export default Table;
