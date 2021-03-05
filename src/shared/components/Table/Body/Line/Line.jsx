import React from 'react';
import PropTypes from 'prop-types';
import withClassModifier from '@axa-fr/react-toolkit-core/dist/withClassModifier.hoc';
import Td from './Td';

const Tr = withClassModifier(({ className, children }) => (
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
  columns: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node,
};

Line.defaultProps = {
  columns: [],
  className: 'af-table__tr',
  actions: null,
  children: null,
};

export default Line;
