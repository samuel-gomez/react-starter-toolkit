import Layout, { TLayoutPage } from 'Layout';
import Loader, { TLoaderContainer } from 'shared/components/Loader';
import Resilience from 'shared/components/Resilience';
import Table from 'shared/components/Table';
import DownloadLink from 'shared/components/DownloadLink';
import { formatDate } from 'shared/helpers/formatDate';
import { TITLE_BAR, TITLE, SUBTITLE, TABLE_HEADERS_SEARCHMEMBERS } from './constants';
import SearchForm from './SearchForm';
import type { TReturnUseFormSearchMembers, TReturnUseSearchMembers } from './SearchMembers.hook';

export const getDownloadPath = (memberId: string) => `members/${memberId}/download-detail`;

export const setFileName = ({ name = '', memberId = '', date = `${new Date()}`, prefix = 'prefix', extension = 'csv', formatDateFn = formatDate }) =>
  `${prefix}_${name.replace(/ /g, '_').trim()}_${memberId}_${formatDateFn(date, 'fr-CA').replace(/-/g, '')}.${extension}`;

type TDownloadLinkEnhanced = {
  idKey: string;
  firstname: string;
  lastname: string;
  getDownloadPathFn?: typeof getDownloadPath;
  setFileNameFn?: typeof setFileName;
};

export const DownloadLinkEnhanced = ({
  idKey,
  firstname,
  lastname,
  getDownloadPathFn = getDownloadPath,
  setFileNameFn = setFileName,
}: TDownloadLinkEnhanced) => (
  <DownloadLink path={getDownloadPathFn(idKey)} fileName={setFileNameFn({ memberId: idKey, name: `${firstname}-${lastname}` })} />
);

type TSearchMembers = TLayoutPage &
  Omit<TReturnUseSearchMembers, 'isLoading'> & {
    loaderMode: TLoaderContainer['mode'];
    submitFormSearchMembers: TReturnUseFormSearchMembers['submitFormSearchMembers'];
  };

const SearchMembers = ({ titleBar = TITLE_BAR, title = TITLE, loaderMode, searchMembers, anomaly, submitFormSearchMembers }: TSearchMembers) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h1 className="af-title--content">{title}</h1>
    <SearchForm submitFormSearchMembers={submitFormSearchMembers} />
    <Loader text="Recherche des membres en cours..." mode={loaderMode}>
      <Resilience anomaly={anomaly}>
        <h2 className="af-title">{SUBTITLE}</h2>
        <Table items={searchMembers} headers={TABLE_HEADERS_SEARCHMEMBERS} />
      </Resilience>
    </Loader>
  </Layout>
);

export default SearchMembers;
