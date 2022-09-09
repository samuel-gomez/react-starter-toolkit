/* eslint-disable react/forbid-prop-types */

import { ReactNode } from 'react';
import { Table } from '@axa-fr/react-toolkit-all';
import HelpHover from 'shared/components/HelpInfo';
import Th, { TThContainer } from './Th';

type Theaders = {
  label: string;
  key: string;
  field?: string;
  infobulle?: ReactNode;
};

export type THeader = TThContainer & {
  headers?: Theaders[];
  children?: ReactNode;
  ariaLabel?: string;
  ariaLabelLine?: string;
};

const Header = ({ headers = [], onSort, sorting, children, ariaLabel = 'table-header', ariaLabelLine = 'table-header-line' }: THeader) => (
  <thead className="af-table__thead" aria-label={ariaLabel}>
    <Table.Tr className="af-table__tr" aria-label={ariaLabelLine}>
      <>
        {!!headers.length &&
          headers.map(({ field, label, key, infobulle }) => (
            <Th key={key} sorting={sorting} field={field} onSort={onSort}>
              <HelpHover content={infobulle}>
                <span className="af-table__th-label">{label}</span>
              </HelpHover>
            </Th>
          ))}
        {children}
      </>
    </Table.Tr>
  </thead>
);

export default Header;
