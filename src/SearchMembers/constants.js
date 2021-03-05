export const TITLE_BAR = 'Recherche de membres';
export const TITLE = 'Recherche par Nom';
export const SUBTITLE = 'Tableau des membres';
export const ROUTE_URL_SEARCHMEMBERS = '/search-members';

export const FETCH_SEARCHMEMBERS = {
  INIT: 'FETCH_SEARCHMEMBERS_INIT',
  SUCCESS: 'FETCH_SEARCHMEMBERS_SUCCESS',
  FAILURE: 'FETCH_SEARCHMEMBERS_FAILURE',
};

export const TABLE_HEADERS_SEARCHMEMBERS = [
  { label: 'Prénom du membre', key: 'firstname' },
  { label: 'Nom du membre', key: 'lastname' },
  { label: 'Identifiant du membre', key: '_id' },
];
