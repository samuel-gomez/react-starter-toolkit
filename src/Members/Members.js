import React from 'react';
import Resilience from 'shared/components/Resilience/Resilience';
import NotificationsContainer from 'shared/components/Notifications';
import { Loader } from '@axa-fr/react-toolkit-all';
import MembersTable from './MembersTable';
import { TITLE_BAR, TITLE } from './constants';
import './Members.scss';

const Members = ({ header, footer, title, loaderMode, members, anomaly, deleteNotification, notifications }) => (
  <>
    {header()}
    {notifications && notifications.length > 0 && <NotificationsContainer notifications={notifications} deleteNotification={deleteNotification} />}
    {title({ children: TITLE_BAR })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
      <Loader mode={loaderMode}>
        <Resilience anomaly={anomaly}>
          <MembersTable members={members} />
        </Resilience>
      </Loader>
    </div>
    {footer()}
  </>
);

export default Members;
