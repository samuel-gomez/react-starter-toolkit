import { NONE, ASCENDING, DESCENDING } from 'shared/components/Table/constants';
import type { Torder } from './ThSortable.container';

export const orderIcons = (order: Torder = NONE) =>
  ({
    [NONE]: 'sorting',
    [ASCENDING]: 'arrow-xs-up',
    [DESCENDING]: 'arrow-xs-down',
  }[order]);

export type TSortingIcon = {
  orderIconsFn?: typeof orderIcons;
  order?: Torder;
};

const SortingIcon = ({ order, orderIconsFn = orderIcons }: TSortingIcon) => (
  <span className={`af-btn__icon af-btn__icon--table-sorting glyphicon glyphicon-${orderIconsFn(order)}`} />
);

export default SortingIcon;
