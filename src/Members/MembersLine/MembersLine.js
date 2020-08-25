import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@axa-fr/react-toolkit-all';

const MembersLine = ({ firstname, lastname, birthdate, type }) => (
  <Table.Tr>
    <Table.Td>{firstname}</Table.Td>
    <Table.Td>{lastname}</Table.Td>
    <Table.Td>{birthdate}</Table.Td>
    <Table.Td>{type}</Table.Td>
  </Table.Tr>
);

MembersLine.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
};

export default MembersLine;
