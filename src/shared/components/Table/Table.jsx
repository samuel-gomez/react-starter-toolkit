import React from 'react';
import PropTypes from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';
import Body from './Body';
import Header, { HeadersPropTypes } from './Header';

const Table = WithClassNameModifier(({ onSort, sorting, className, headers, items, childrenHeader, actionsBody }) => (
  <table className={className}>
    <Header headers={headers} onSort={onSort} sorting={sorting}>
      {childrenHeader}
    </Header>
    <Body items={items} actions={actionsBody} />
  </table>
));

Table.propTypes = {
  headers: HeadersPropTypes.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

Table.defaultProps = {
  className: 'af-table',
};

export default Table;
