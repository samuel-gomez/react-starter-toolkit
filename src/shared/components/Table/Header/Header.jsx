/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
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

export const HeadersPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    field: PropTypes.string,
  }),
);

export const HeaderPropTypes = {
  headers: HeadersPropTypes.isRequired,
  onSort: PropTypes.func,
  sorting: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.oneOf([NONE, ASCENDING, DESCENDING]),
  }),
  sortingInfo: PropTypes.objectOf(PropTypes.oneOf([NONE, ASCENDING, DESCENDING])),
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  ariaLabelLine: PropTypes.string,
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
