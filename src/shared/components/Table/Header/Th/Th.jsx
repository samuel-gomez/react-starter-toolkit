import React from 'react';
import PropTypes from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';

const Th = WithClassNameModifier(({ className, children, ariaLabel, ...rest }) => (
  <th className={className} aria-label={ariaLabel} {...rest}>
    {children}
  </th>
));

Th.propTypes = {
  ariaLabel: PropTypes.string,
  role: PropTypes.string,
  className: PropTypes.string,
};

Th.defaultProps = {
  ariaLabel: 'table-body-line',
  role: 'columnheader',
  className: 'af-table__th',
};

export default Th;
