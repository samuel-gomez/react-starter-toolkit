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
    label: 'Forms',
    url: ROUTE_URL.FORM,
    children: [
      {
        label: 'Champs classiques',
        url: `${ROUTE_URL.FORM}${ROUTE_URL.FIELDS_CLASSICS}`,
      },
      {
        label: 'Champ datepicker',
        url: `${ROUTE_URL.FORM}${ROUTE_URL.DATEPICKER}`,
      },
      {
        label: 'Champ slider',
        url: `${ROUTE_URL.FORM}${ROUTE_URL.SLIDER}`,
      },
    ],
  },
];

export default MENU_ITEMS;
