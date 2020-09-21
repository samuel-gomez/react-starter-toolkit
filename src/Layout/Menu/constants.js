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
    label: 'Slash DS',
    url: ROUTE_URL.SLASH,
  },
];

export default MENU_ITEMS;
