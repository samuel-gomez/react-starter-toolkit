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

export const WORKFLOW_ROUTE = '/workflow';

export const STATUS_API = {
  SUCCESS: 200,
  CREATED: 201,
  WARNING: 40,
  ERROR: 50,
};

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

export const MODIFIER_MODAL = 'workflow-status';
