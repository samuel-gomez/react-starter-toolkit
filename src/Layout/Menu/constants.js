import ROUTE_URL from 'Layout/constants';

export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: ROUTE_URL.DASHBOARD,
  },
  {
    label: 'Membres',
    url: ROUTE_URL.MEMBERS,
  },
  {
    label: 'Rechercher',
    url: ROUTE_URL.SEARCHMEMBERS,
  },
  {
    label: 'Slash DS',
    url: ROUTE_URL.SLASH,
  },
  {
    label: 'Demos',
    children: [
      {
        label: 'Modal',
        url: ROUTE_URL.MODAL,
      },
    ],
  },
  {
    label: 'Pages',
    children: [
      {
        label: 'Not found',
        url: ROUTE_URL.NOTFOUND,
      },
      {
        label: 'Forbidden',
        url: ROUTE_URL.UNAUTHORIZE,
      },
    ],
  },
];

export default MENU_ITEMS;
