import isEmptyOrNull from 'shared/helpers/isEmptyOrNull';

const setAnomalyEmptyItems = (items: unknown[] = [], label = 'Info : Aucune donnée trouvée', isEmptyOrNullFn = isEmptyOrNull) =>
  isEmptyOrNullFn(items) ? { label, type: 'info', iconName: 'exclamation-sign' } : null;

export default setAnomalyEmptyItems;
