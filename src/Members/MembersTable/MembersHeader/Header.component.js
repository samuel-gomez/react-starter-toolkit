/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@axa-fr/react-toolkit-all';
import { NONE, DESCENDING, ASCENDING } from 'shared/constants';
import { TABLE_HEADERS_MEMBERS } from 'Members/constants';
import TableTh from './TableTh';
import { toggleSorting } from './Header.helper';

const TableHeader = ({ onSort, sorting, sortingInfo }) => (
  <Table.Header>
    <Table.Tr className="af-table__tr">
      {TABLE_HEADERS_MEMBERS.map(({ field, label }) => (
        <TableTh key={field} order={sortingInfo[field]} sort={() => onSort(toggleSorting(field, sorting))} sortable={Boolean(field)}>
          {label}
        </TableTh>
      ))}
    </Table.Tr>
  </Table.Header>
);

const propTypes = {
  onSort: PropTypes.func,
  sorting: PropTypes.object,
  sortingInfo: PropTypes.objectOf(PropTypes.oneOf([NONE, ASCENDING, DESCENDING])),
};

const defaultProps = {
  onSort: undefined,
  sorting: {},
  sortingInfo: {},
};

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
