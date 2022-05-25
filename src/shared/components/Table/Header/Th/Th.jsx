import { string } from 'prop-types';
import WithClassNameModifier from 'shared/hoc/WithClassNameModifier';

const Th = WithClassNameModifier(({ className, children, ariaLabel, ...rest }) => (
  <th className={className} aria-label={ariaLabel} {...rest}>
    {children}
  </th>
));

Th.propTypes = {
  ariaLabel: string,
  role: string,
  className: string,
};

Th.defaultProps = {
  ariaLabel: 'table-body-line',
  role: 'columnheader',
  className: 'af-table__th',
};

export default Th;
