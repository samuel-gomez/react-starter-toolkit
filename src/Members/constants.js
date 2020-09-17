export const TITLE_BAR = 'Gestion des membres';
export const TITLE = 'Liste des membres';

export const FETCH_MEMBERS = {
  INIT: 'FETCH_MEMBERS_INIT',
  SUCCESS: 'FETCH_MEMBERS_SUCCESS',
  FAILURE: 'FETCH_MEMBERS_FAILURE',
  ORDER: 'FETCH_MEMBERS_ORDER',
};

export const TABLE_HEADERS_MEMBERS = [
  { label: 'Prénom', field: 'firstname', id: 'firstname' },
  { label: 'Nom', field: 'lastname', id: 'lastname' },
  { label: 'Date de naissance', field: 'birthdate', id: 'birthdate' },
  { label: 'Sexe', id: 'sexe' },
];

export const ROUTE_URL_MEMBERS = '/members';
