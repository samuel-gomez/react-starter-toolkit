/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@axa-fr/react-toolkit-all';
import { NONE, DESCENDING, ASCENDING } from 'shared/constants';
import MembersHeaderTh from './MembersHeaderTh';

const MembersHeader = ({ onSort, sorting, sortingInfo, headers }) => (
  <Table.Header>
    <Table.Tr className="af-table__tr">
      {headers.map(({ field, label, id }) => (
        <MembersHeaderTh key={id} sorting={sorting} sortingInfo={sortingInfo} field={field} onSort={onSort}>
          {label}
        </MembersHeaderTh>
      ))}
    </Table.Tr>
  </Table.Header>
);

const propTypes = {
  onSort: PropTypes.func,
  sorting: PropTypes.object,
  sortingInfo: PropTypes.objectOf(PropTypes.oneOf([NONE, ASCENDING, DESCENDING])),
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const defaultProps = {
  onSort: undefined,
  sorting: {},
  sortingInfo: {},
};

MembersHeader.propTypes = propTypes;
MembersHeader.defaultProps = defaultProps;

export default MembersHeader;
