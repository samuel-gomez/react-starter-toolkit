import { ASCENDING, DESCENDING } from 'shared/constants';

export const toggleOrder = order => (order === ASCENDING ? DESCENDING : ASCENDING);

export const toggleSorting = (field, { field: prevField, order }) => {
  const newOrder = {
    field,
    order: prevField !== field ? ASCENDING : toggleOrder(order),
  };
  return newOrder;
};
