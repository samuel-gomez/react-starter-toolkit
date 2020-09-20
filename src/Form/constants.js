import { ROUTE_URL_FIELDS_CLASSICS } from 'Form/FieldsClassics/constants';

export const TITLE_BAR = 'Création de formulaire';
export const TITLE = 'Liste des champs';
export const ROUTE_URL_FORM = '/form';

export const FIELDS = [
  {
    id: ROUTE_URL_FIELDS_CLASSICS,
    title: 'Champ de saisie',
    storybook: {
      text: 'Storybook : Text Input',
      path: 'form-input-text--text',
    },
    designSystem: {
      text: 'Guidelines : Text Input',
      path: '/molecules/form-text/',
    },
    picture: {
      name: 'champ-texte.jpg',
      alt: 'champ texte',
    },
  },
];
