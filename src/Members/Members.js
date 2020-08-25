import React from 'react';
import Resilience from 'shared/components/Resilience/Resilience';
import NotificationsContainer from 'shared/components/Notifications';
import { Table, Loader } from '@axa-fr/react-toolkit-all';
import MembersLine from './MembersLine';
import { TITLE_BAR, TITLE } from './constants';
import './Members.scss';

export const MembersItems = ({ members }) => (
  <>
    {members.length > 0 && (
      <Table classModifier="members">
        <Table.Header headers>
          <Table.Th>Nom</Table.Th>
          <Table.Th>Prénom</Table.Th>
          <Table.Th>Date de naissance</Table.Th>
          <Table.Th>Type</Table.Th>
        </Table.Header>
        <Table.Body>
          {members.map(({ _id, ...restStudy }) => (
            <MembersLine key={_id} id={_id} {...restStudy} />
          ))}
        </Table.Body>
      </Table>
    )}
  </>
);

const Members = ({ header, footer, title, loaderMode, members, anomaly, deleteNotification, notifications }) => (
  <>
    {header()}
    {notifications && notifications.length > 0 && <NotificationsContainer notifications={notifications} deleteNotification={deleteNotification} />}
    {title({ children: TITLE_BAR })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
      <Loader mode={loaderMode}>
        <Resilience anomaly={anomaly}>
          <MembersItems members={members} />
        </Resilience>
      </Loader>
    </div>
    {footer()}
  </>
);

export default Members;
