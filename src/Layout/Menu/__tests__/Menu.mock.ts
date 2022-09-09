export const MENU_ITEMS_MOCK = [
  {
    label: 'Accueil',
    url: '/',
  },
  {
    label: 'Démos',
    url: '/demos',
    basePathChildren: '/demos',
    children: [
      {
        label: 'Pages',
        classModifierItem: 'separator',
      },
      {
        label: 'Membres',
        url: 'members',
      },
      {
        label: 'Rechercher',
        url: 'search-members',
      },
      {
        label: 'Composants',
        classModifierItem: 'separator',
      },
      {
        label: 'Modal',
        url: 'modal',
      },
      {
        label: 'Button',
        url: 'button',
      },
      {
        label: 'Notification',
        url: 'notification',
      },
    ],
  },
  {
    label: 'Pages',
    children: [
      {
        label: 'Not found',
        url: '/notfound',
      },
      {
        label: 'Forbidden',
        url: '/forbidden',
      },
    ],
  },
];

export const expectedMock = [
  {
    label: 'Accueil',
    url: '/',
  },
  {
    children: [
      {
        classModifierItem: 'separator',
        label: 'Pages',
      },
      {
        label: 'Membres',
        url: '/demos/members',
      },
      {
        label: 'Rechercher',
        url: '/demos/search-members',
      },
      {
        classModifierItem: 'separator',
        label: 'Composants',
      },
      {
        label: 'Modal',
        url: '/demos/modal',
      },
      {
        label: 'Button',
        url: '/demos/button',
      },
      {
        label: 'Notification',
        url: '/demos/notification',
      },
    ],
    label: 'Démos',
    url: '/demos',
  },
  {
    children: [
      {
        label: 'Not found',
        url: '/notfound',
      },
      {
        label: 'Forbidden',
        url: '/forbidden',
      },
    ],
    label: 'Pages',
  },
];
