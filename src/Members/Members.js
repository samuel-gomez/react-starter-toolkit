import React from 'react';
import Resilience from 'shared/components/Resilience/Resilience';
import NotificationsContainer from 'shared/components/Notifications';
import { Loader, Paging } from '@axa-fr/react-toolkit-all';
import MembersTable from './MembersTable';
import { TITLE_BAR, TITLE } from './constants';
import './Members.scss';

const Members = ({ header, footer, title, menu, loaderMode, members, anomaly, deleteNotification, notifications, onChangePaging, pagination }) => (
  <>
    {header()}
    {menu()}
    {notifications && notifications.length > 0 && <NotificationsContainer notifications={notifications} deleteNotification={deleteNotification} />}
    {title({ title: TITLE_BAR, backHome: true })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
      <Loader mode={loaderMode}>
        <Resilience anomaly={anomaly}>
          <MembersTable members={members} />
          <Paging {...pagination} onChange={onChangePaging} />
        </Resilience>
      </Loader>
    </div>
    {footer()}
  </>
);

export default Members;
