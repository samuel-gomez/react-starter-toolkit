import { string } from 'prop-types';
import Layout from 'Layout';
import Loader from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience';
import Table from 'shared/components/Table';
import DownloadLink from 'shared/components/DownloadLink';
import { formatDate } from 'shared/helpers/formatDate';
import { TITLE_BAR, TITLE, SUBTITLE, TABLE_HEADERS_SEARCHMEMBERS } from './constants';
import SearchForm from './SearchForm';

export const getDownloadPath = distributorId => `members/${distributorId}/download-detail`;

export const setFileName = ({ name = '', distributorId = '', date = new Date(), prefix = 'prefix', extension = 'csv', formatDateFn = formatDate }) =>
  `${prefix}_${name.replace(/ /g, '_').trim()}_${distributorId}_${formatDateFn(date, 'fr-CA').replace(/-/g, '')}.${extension}`;

export const DownloadLinkEnhanced = ({ idKey, firstname, lastname, getDownloadPathFn = getDownloadPath, setFileNameFn = setFileName }) => (
  <DownloadLink path={getDownloadPathFn(idKey)} fileName={setFileNameFn({ distributorId: idKey, name: `${firstname}-${lastname}` })} />
);
const SearchMembers = ({ titleBar, title, loaderMode, members, anomaly, submitSearch }) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h1 className="af-title--content">{title}</h1>
    <SearchForm submitSearchForm={submitSearch} />
    <Loader text="Recherche des membres en cours..." mode={loaderMode}>
      <Resilience anomaly={anomaly}>
        <h2 className="af-title">{SUBTITLE}</h2>
        <Table items={members} headers={TABLE_HEADERS_SEARCHMEMBERS} />
      </Resilience>
    </Loader>
  </Layout>
);

SearchMembers.propTypes = {
  titleBar: string,
  title: string,
};

SearchMembers.defaultProps = {
  titleBar: TITLE_BAR,
  title: TITLE,
};

export default SearchMembers;
