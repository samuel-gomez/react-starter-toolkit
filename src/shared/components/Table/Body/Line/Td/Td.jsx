import React from 'react';
import PropTypes from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';

const Td = WithClassNameModifier(({ className, children }) => <td className={className}>{children}</td>);

Td.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Td.defaultProps = {
  children: null,
  className: 'af-table__cell',
};

export default Td;
