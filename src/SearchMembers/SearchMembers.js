import React from 'react';
import Loader from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience/Resilience';
import Th from 'shared/components/Table/Header/Th';
import Table from 'shared/components/Table';
import { TITLE_BAR, TITLE, SUBTITLE, TABLE_HEADERS_SEARCHMEMBERS } from './constants';
import DownloadLink from './DownloadLink';
import SearchForm from './SearchForm';

const SearchMembers = ({ header, footer, title, menu, loaderMode, members, anomaly, deleteNotification, notifications, submitSearch }) => (
  <>
    {header()}
    {menu()}
    {title({ title: TITLE_BAR })}
    <div className="af-main container">
      <h1 className="af-title--content">{TITLE}</h1>
      <SearchForm submitSearchForm={submitSearch} />
      <Loader text="Recherche des membres en cours..." mode={loaderMode}>
        <Resilience anomaly={anomaly}>
          <h2 className="af-title">{SUBTITLE}</h2>
          <Table
            items={members}
            headers={TABLE_HEADERS_SEARCHMEMBERS}
            childrenHeader={
              <Th>
                <span className="af-table__tr-label">Actions</span>
              </Th>
            }
            actionsBody={DownloadLink}
          />
        </Resilience>
      </Loader>
    </div>
    {footer()}
  </>
);

export default SearchMembers;
