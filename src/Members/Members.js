import React from 'react';
import Resilience from 'shared/components/Resilience/Resilience';
import { Paging } from '@axa-fr/react-toolkit-all';
import Loader from 'shared/components/Loader';
import Table from 'shared/components/Table';
import { TITLE_BAR, TITLE, TABLE_HEADERS_MEMBERS } from './constants';

const Members = ({ header, footer, title, menu, loaderMode, members, anomaly, onChangePaging, pagination, onChangeSorting, sorting }) => (
  <>
    {header()}
    {menu()}
    {title({ title: TITLE_BAR, backHome: true })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
      <Loader mode={loaderMode}>
        <Resilience anomaly={anomaly}>
          <Table items={members} headers={TABLE_HEADERS_MEMBERS} onSort={onChangeSorting} sorting={sorting} />
          <Paging {...pagination} onChange={onChangePaging} id="paging" />
        </Resilience>
      </Loader>
    </div>
    {footer()}
  </>
);

export default Members;
