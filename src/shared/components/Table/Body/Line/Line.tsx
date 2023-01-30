import { ComponentPropsWithoutRef } from 'react';
import { default as TableTk } from '@axa-fr/react-toolkit-table';
import Td, { TTdContainer } from './Td';

export type TLine = ComponentPropsWithoutRef<typeof TableTk.Tr> & {
  columns: (TTdContainer & { keyCol: string })[];
  ariaLabel?: string;
};

const Line = ({ className, columns = [], classModifier = '', children, ariaLabel = 'table-body-line' }: TLine) => (
  <TableTk.Tr classModifier={classModifier} className={className} aria-label={ariaLabel}>
    <>
      {columns.map(({ keyCol, ...restTd }) => (
        <Td key={keyCol} {...restTd} />
      ))}
      {children}
    </>
  </TableTk.Tr>
);

export default Line;
