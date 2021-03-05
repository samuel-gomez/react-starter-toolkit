import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@axa-fr/react-toolkit-all';

const Td = ({ children, ...restTd }) => (
  <Table.Td {...restTd} >{children}</Table.Td>
);

Td.propTypes = {
  children: PropTypes.node,
};

Td.defaultProps = {
  children: null
};

export default Td;
