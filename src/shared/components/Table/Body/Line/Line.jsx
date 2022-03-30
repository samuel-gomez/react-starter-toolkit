import React from 'react';
import { arrayOf, string, node, object } from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';
import Td from './Td';

const Tr = WithClassNameModifier(({ className, children }) => (
  <tr className={className} aria-label="table-body-line">
    {children}
  </tr>
));

const Line = ({ className, columns, actions, modifier, children }) => (
  <Tr classModifier={modifier} className={className}>
    <>
      {columns.map(({ keyCol, ...restTd }) => (
        <Td key={keyCol} {...restTd} />
      ))}
      {actions && <Td classModifier="actions">{actions}</Td>}
      {children}
    </>
  </Tr>
);

Line.propTypes = {
  columns: arrayOf(object),
  className: string,
  actions: node,
  children: node,
};

Line.defaultProps = {
  columns: [],
  className: 'af-table__tr',
  actions: null,
  children: null,
};

export default Line;
