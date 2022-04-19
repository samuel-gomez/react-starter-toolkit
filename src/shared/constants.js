import { string, number, shape, oneOfType, arrayOf } from 'prop-types';

export const MSG_REQUIRED = 'Le champ est obligatoire';

export const MSG_FORMAT = 'Format invalide';

export const MSG_ERROR_FORMAT = 'Format de fichier incorrect';

export const rulesRequired = {
  required: {
    message: MSG_REQUIRED,
  },
};

export const rulePattern = {
  pattern: {
    regex: /^[0-9a-zA-Z\s-_]{1,50}$/,
    message: MSG_FORMAT,
  },
};

export const rulesErrorFormat = {
  required: {
    message: MSG_ERROR_FORMAT,
  },
};

export const STATUS_HTTP = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZE: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  SERVER_ERROR: 500,
};

export const STATUS_API = {
  SUCCESS: STATUS_HTTP.SUCCESS,
  CREATED: STATUS_HTTP.CREATED,
  WARNING: 40,
  ERROR: 50,
};

export const STATUS_HTTP_MESSAGES = {
  [STATUS_HTTP.SUCCESS]: 'Succès: La requête a réussi',
  [STATUS_HTTP.CREATED]: 'Succès: Création réussie',
  [STATUS_HTTP.BAD_REQUEST]: 'Erreur: La syntaxe de la requête est erronée',
  [STATUS_HTTP.UNAUTHORIZE]: 'Erreur: Une authentification est nécessaire pour accéder à la ressource',
  [STATUS_HTTP.FORBIDDEN]: 'Erreur: Accès non autorisé',
  [STATUS_HTTP.NOTFOUND]: 'Erreur: Elément non trouvé',
  [STATUS_HTTP.SERVER_ERROR]: 'Erreur: Problème technique ! Contacter votre support',
};

export const TIMEOUT = 20000;
export const TIMEOUT_ERROR_MESSAGE = 'Erreur: la requête a mis trop de temps';

export const MODIFIER_CLASS = {
  success: 'success',
  disabled: 'disabled',
};

export const COMMENT = {
  NAME: 'comment',
  LABEL: 'Commentaire',
  SUBLABEL: 'Facultatif',
  MAXLENGTH: '300',
};

export const JSON_CONTENT_HEADER = {
  'Content-Type': 'application/json',
};

export const STORYBOOK = 'https://axaguildev.github.io/react-toolkit/latest/storybook/';
export const DESIGN_SYSTEM = 'https://axaguildev.github.io/design-system/';

export const ADMIN = 'Admin';
export const READER = 'Reader';
export const WRITER = 'Writer';
export const USER = 'User';

export const PROFILS = [ADMIN, READER, WRITER, USER];

export const DEFAULT_OPTION_LABEL = '- Sélectionner -';
export const DEFAULT_OPTION = {
  value: '',
  label: DEFAULT_OPTION_LABEL,
};

/**
 * Commons proptypes
 */

export const ContextPropTypes = shape({
  Provider: shape({ defaultValue: string, currentValue: string, changedBits: number }),
  Consumer: shape({ defaultValue: string, currentValue: string, changedBits: number }),
});

export const SelectPropTypes = arrayOf(
  shape({
    value: oneOfType([string, number]),
    label: string,
  }),
);

export const AnomalyPropTypes = shape({
  code: number,
  detail: string,
  label: string,
});

export const IdPropTypes = oneOfType([string, number]);
