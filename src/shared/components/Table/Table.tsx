import { ReactNode, ComponentPropsWithoutRef } from 'react';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import Body, { TBody } from './Body';
import Header, { THeader } from './Header';

export type TTable = THeader &
  TBody & {
    childrenHeader?: ReactNode;
    className?: string;
  } & ComponentPropsWithoutRef<'table'>;

const DEFAULT_CLASSNAME = 'af-table';

const Table = withClassNameModifier(
  ({ onSort, sorting, className, headers, items, childrenHeader, ...rest }: TTable) => (
    <table className={className} {...rest}>
      <Header headers={headers} onSort={onSort} sorting={sorting}>
        {childrenHeader}
      </Header>
      <Body items={items} />
    </table>
  ),
  DEFAULT_CLASSNAME,
);

export default Table;
