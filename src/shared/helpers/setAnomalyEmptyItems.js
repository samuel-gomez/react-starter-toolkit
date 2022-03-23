import isEmptyOrNull from 'shared/helpers/isEmptyOrNull';

export default (items = [], isEmptyOrNullFn = isEmptyOrNull) =>
  isEmptyOrNullFn(items) ? { label: 'Info : Aucune donnée trouvée', type: 'info', iconName: 'exclamation-sign' } : null;
