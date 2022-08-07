import { ReactNode } from 'react';
import Table, { TTable } from './Table';

type TTableContainer = TTable & {
  children?: ReactNode;
  TableCmpt?: typeof Table;
};

const TableContainer = ({ children, TableCmpt = Table, items = [], headers = [], ...restTable }: TTableContainer) =>
  !!(items.length > 0) ? (
    <TableCmpt items={items} headers={headers} {...restTable}>
      {children}
    </TableCmpt>
  ) : (
    <></>
  );
export default TableContainer;
