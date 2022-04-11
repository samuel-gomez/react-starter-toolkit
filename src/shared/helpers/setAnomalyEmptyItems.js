import isEmptyOrNull from 'shared/helpers/isEmptyOrNull';

export default (items = [], label = 'Info : Aucune donnée trouvée', isEmptyOrNullFn = isEmptyOrNull) =>
  isEmptyOrNullFn(items) ? { label, type: 'info', iconName: 'exclamation-sign' } : null;
