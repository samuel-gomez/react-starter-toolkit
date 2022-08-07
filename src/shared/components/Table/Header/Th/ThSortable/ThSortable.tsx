import { ReactNode } from 'react';
import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import { NONE, ASCENDING, DESCENDING } from 'shared/components/Table/constants';
import { Torder } from '.';

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
export const SortingIcon = ({ order, orderIconsFn = orderIcons }: TSortingIcon) => (
  <span className={`af-btn__icon af-btn__icon--table-sorting glyphicon glyphicon-${orderIconsFn(order)}`} />
);

export type TThSortable = {
  className?: string;
  children?: ReactNode;
  sort: () => void;
  order: Torder;
} & WithClassModifierOptions;

const DEFAULT_CLASSNAME = 'af-table__th';

const ThSortable = ({ className, children, sort, order }: TThSortable) => (
  <th role="button" onClick={sort} className={className}>
    {children}
    <SortingIcon order={order} />
  </th>
);

const enhance = compose(identity<TThSortable>(), withClassDefault(DEFAULT_CLASSNAME), withClassModifier());

const Enhanced = enhance(ThSortable);
Enhanced.displayName = ThSortable.name;

export default Enhanced;
