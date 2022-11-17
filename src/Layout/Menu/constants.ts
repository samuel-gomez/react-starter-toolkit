import ROUTE_URL from 'App/Routes/constants';

export const CLASS_BODY_MENU_OPEN = 'af-menu-open';

const MENU_ITEMS = [
  {
    label: 'Accueil',
    url: ROUTE_URL.HOME,
  },
  {
    label: 'Démos',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Membres',
        url: ROUTE_URL.MEMBERS,
      },
      {
        label: 'Rechercher',
        url: ROUTE_URL.SEARCHMEMBERS,
      },
      {
        label: 'Modal',
        url: ROUTE_URL.MODAL,
      },
      {
        label: 'Notification',
        url: ROUTE_URL.NOTIFICATION,
      },
    ],
  },
  {
    label: 'Toolkit components',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Button',
        url: ROUTE_URL.BUTTON,
      },
      {
        label: 'Action',
        url: ROUTE_URL.ACTION,
      },
      {
        label: 'Alert',
        url: ROUTE_URL.ALERT,
      },
      {
        label: 'Restitution',
        url: ROUTE_URL.RESTITUTION,
      },
      {
        label: 'Tabs',
        url: ROUTE_URL.TABS,
      },
      {
        label: 'Badge',
        url: ROUTE_URL.BADGE,
      },
      {
        label: 'Title',
        url: ROUTE_URL.TITLE,
      },
      {
        label: 'Help',
        url: ROUTE_URL.HELP,
      },
      {
        label: 'Table',
        url: ROUTE_URL.TABLE,
      },
      {
        label: 'Popover',
        url: ROUTE_URL.POPOVER,
      },
    ],
  },
  {
    label: 'Toolkit structure',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Header',
        url: ROUTE_URL.HEADER,
      },
      {
        label: 'TitleBar',
        url: ROUTE_URL.TITLEBAR,
      },
      {
        label: 'NavBar',
        url: ROUTE_URL.NAVBAR,
      },
      {
        label: 'Infos',
        url: ROUTE_URL.INFOS,
      },
    ],
  },
  {
    label: 'Toolkit form components',
    url: ROUTE_URL.DEMOS,
    basePathChildren: ROUTE_URL.DEMOS,
    children: [
      {
        label: 'Text Input',
        url: ROUTE_URL.TEXT_INPUT,
      },
      {
        label: 'Textarea Input',
        url: ROUTE_URL.TEXTAREA_INPUT,
      },
      {
        label: 'Radio Input',
        url: ROUTE_URL.RADIO_INPUT,
      },
      {
        label: 'Select Input',
        url: ROUTE_URL.SELECT_INPUT,
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
  {
    label: 'Layout',
    url: `/${ROUTE_URL.LAYOUT}`,
  },
];

export default MENU_ITEMS;
