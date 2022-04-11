import React from 'react';
import { arrayOf, string, object } from 'prop-types';
import WithClassNameModifier from 'shared/hoc/WithClassNameModifier';
import Body from './Body';
import Header, { HeadersPropTypes } from './Header';

const Table = WithClassNameModifier(({ onSort, sorting, className, headers, items, childrenHeader, actionsBody, ...rest }) => (
  <table className={className} {...rest}>
    <Header headers={headers} onSort={onSort} sorting={sorting}>
      {childrenHeader}
    </Header>
    <Body items={items} actions={actionsBody} />
  </table>
));

Table.propTypes = {
  headers: HeadersPropTypes.isRequired,
  items: arrayOf(object).isRequired,
  className: string,
};

Table.defaultProps = {
  className: 'af-table',
};

export default Table;
