import { ReactNode } from 'react';
import withClassNameModifier from 'shared/hoc/WithClassNameModifier';

export type TTh = {
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
  role?: string;
};

const DEFAULT_CLASSNAME = 'af-table__th';

const Th = withClassNameModifier(
  ({ className, children, role = 'columnheader', ...rest }: TTh) => (
    <th className={className} role={role} {...rest}>
      {children}
    </th>
  ),
  DEFAULT_CLASSNAME,
);

export default Th;
