import React from 'react';
import { node, string } from 'prop-types';
import WithClassNameModifier from 'shared/hoc/WithClassNameModifier';

const Td = WithClassNameModifier(({ className, children }) => <td className={className}>{children}</td>);

Td.propTypes = {
  children: node,
  className: string,
};

Td.defaultProps = {
  children: null,
  className: 'af-table__cell',
};

export default Td;
