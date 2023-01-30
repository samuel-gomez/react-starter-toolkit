import { ReactNode } from 'react';
import { default as TableTk } from '@axa-fr/react-toolkit-table';
import HelpHover from 'shared/components/HelpInfo';
import Th, { TTh } from './Th';

type Theaders = {
  label: string;
  key: string;
  field?: string;
  infobulle?: ReactNode;
};

export type THeader = TTh & {
  headers?: Theaders[];
  children?: ReactNode;
  ariaLabel?: string;
  ariaLabelLine?: string;
};

const Header = ({ headers = [], onSort, sorting, children, ariaLabel = 'table-header', ariaLabelLine = 'table-header-line' }: THeader) => (
  <TableTk.Header className="af-table__thead" aria-label={ariaLabel}>
    <TableTk.Tr aria-label={ariaLabelLine}>
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
    </TableTk.Tr>
  </TableTk.Header>
);

export default Header;
