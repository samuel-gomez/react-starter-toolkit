/* eslint-disable react/forbid-prop-types */

import { shape, string, arrayOf, func, oneOf, node, objectOf } from 'prop-types';
import { Table } from '@axa-fr/react-toolkit-all';
import HelpHover from 'shared/components/HelpInfo';
import { NONE, DESCENDING, ASCENDING } from '../constants';
import Th from './Th';

const Header = ({ headers, onSort, sorting, children, ariaLabel, ariaLabelLine }) => (
  <thead className="af-table__thead" aria-label={ariaLabel}>
    <Table.Tr className="af-table__tr" aria-label={ariaLabelLine}>
      <>
        {headers.map(({ field, label, key, infobulle }) => (
          <Th key={key} sorting={sorting} field={field} onSort={onSort}>
            <HelpHover content={infobulle}>
              <span className="af-table__tr-label">{label}</span>
            </HelpHover>
          </Th>
        ))}
        {children}
      </>
    </Table.Tr>
  </thead>
);

export const HeadersPropTypes = arrayOf(
  shape({
    label: string.isRequired,
    key: string.isRequired,
    field: string,
  }),
);

export const HeaderPropTypes = {
  headers: HeadersPropTypes.isRequired,
  onSort: func,
  sorting: shape({
    field: string,
    order: oneOf([NONE, ASCENDING, DESCENDING]),
  }),
  sortingInfo: objectOf(oneOf([NONE, ASCENDING, DESCENDING])),
  children: node,
  ariaLabel: string,
  ariaLabelLine: string,
};

export const HeaderDefaultProps = {
  onSort: undefined,
  sorting: {
    field: '',
    order: NONE,
  },
  sortingInfo: {},
  children: null,
  ariaLabel: 'table-header',
  ariaLabelLine: 'table-header-line',
};

Header.propTypes = HeaderPropTypes;
Header.defaultProps = HeaderDefaultProps;

export default Header;
