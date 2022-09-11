import { ReactNode } from 'react';
import Line from './Line';

export type Tcol = {
  label?: string;
  hover?: string;
  children?: ReactNode;
  classModifier?: string;
};
export type TCols = {
  [k: string]: Tcol;
};

type TItems = {
  key: string;
  modifier?: string;
  cols: TCols;
};

export type TBody = {
  ariaLabel?: string;
  items?: TItems[];
  children?: ReactNode;
};

const Body = ({ items = [], children, ariaLabel = 'table-body' }: TBody) => (
  <tbody className="af-table__body" aria-label={ariaLabel}>
    {items.map(({ key, modifier, cols }) => (
      <Line key={key} modifier={modifier} cols={Object.entries({ ...cols })} />
    ))}
    {children}
  </tbody>
);

export default Body;
