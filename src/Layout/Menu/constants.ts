import ROUTE_URL from 'App/Routes/constants';

export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: ROUTE_URL.SLASH,
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
    label: 'Demos',
    children: [
      {
        label: 'Modal',
        url: ROUTE_URL.MODAL,
      },
      {
        label: 'Button',
        url: ROUTE_URL.BUTTON,
      },
      {
        label: 'Notification',
        url: ROUTE_URL.NOTIFICATION,
      },
    ],
  },
  {
    label: 'Pages',
    children: [
      {
        label: 'Empty page',
        url: ROUTE_URL.DASHBOARD,
      },
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
