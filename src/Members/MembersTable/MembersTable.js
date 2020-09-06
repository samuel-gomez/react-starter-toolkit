import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';
import MembersLine from './MembersLine';
import MembersHeader from './MembersHeader';

const MembersTable = ({ members }) => (
  <>
    {members.length > 0 && (
      <Table classModifier="members">
        <MembersHeader />
        <Table.Body>
          {members.map(({ _id, ...restStudy }) => (
            <MembersLine key={_id} id={_id} {...restStudy} />
          ))}
        </Table.Body>
      </Table>
    )}
  </>
);

export default MembersTable;
