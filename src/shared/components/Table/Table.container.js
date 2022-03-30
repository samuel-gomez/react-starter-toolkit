import React from 'react';
import { node } from 'prop-types';
import Table from './Table';

const TableContainer = ({ children, items = [], headers = [], ...restTable }) =>
  items &&
  items.length > 0 && (
    <Table items={items} headers={headers} {...restTable}>
      {children}
    </Table>
  );

TableContainer.propTypes = {
  children: node,
};

TableContainer.defaultProps = {
  children: null,
};

export default TableContainer;
