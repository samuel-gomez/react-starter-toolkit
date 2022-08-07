import { ReactNode } from 'react';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';
import Td, { TTdContainer } from './Td';

type TTr = {
  className?: string;
  children: ReactNode;
};
const DEFAULT_CLASSNAME = 'af-table__tr';

const Tr = withClassNameModifier(
  ({ className, children, ...rest }: TTr) => (
    <tr className={className} aria-label="table-body-line" {...rest}>
      {children}
    </tr>
  ),
  DEFAULT_CLASSNAME,
);

export type TLine = {
  className?: string;
  columns: (TTdContainer & { keyCol: string })[];
  modifier?: string;
  children?: ReactNode;
};

const Line = ({ className, columns = [], modifier = '', children }: TLine) => (
  <Tr classModifier={modifier} className={className}>
    <>
      {columns.map(({ keyCol, ...restTd }) => (
        <Td key={keyCol} {...restTd} />
      ))}
      {children}
    </>
  </Tr>
);

export default Line;
