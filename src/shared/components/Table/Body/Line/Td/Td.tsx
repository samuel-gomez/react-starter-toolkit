import { ReactNode } from 'react';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';

export type TTd = {
  className?: string;
  children?: ReactNode;
};

const DEFAULT_CLASSNAME = 'af-table__cell';

const Td = withClassNameModifier(
  ({ className, children, ...rest }: TTd) => (
    <td {...rest} className={className}>
      {children}
    </td>
  ),
  DEFAULT_CLASSNAME,
);

export default Td;
