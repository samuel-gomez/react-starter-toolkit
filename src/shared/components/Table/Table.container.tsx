import { ElementType, ReactNode } from 'react';
import { emptyFunction } from 'shared/helpers';
import Table, { TTable } from './Table';
import './Table.scss';

type TTableContainer = TTable & {
  children?: ReactNode;
  TableCmpt?: typeof Table;
  Fallback?: ElementType;
};

const TableContainer = ({ children, TableCmpt = Table, items = [], headers = [], Fallback = emptyFunction, ...restTable }: TTableContainer) =>
  items.length > 0 ? (
    <TableCmpt items={items} headers={headers} {...restTable}>
      {children}
    </TableCmpt>
  ) : (
    <Fallback />
  );
export default TableContainer;
