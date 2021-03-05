import React from 'react';
import PropTypes from 'prop-types';
import { Table as TableToolkit } from '@axa-fr/react-toolkit-all';
import { NONE, DESCENDING, ASCENDING } from './constants';
import Body from './Body';
import Header, { HeadersPropTypes } from './Header';
import './Table.scss';

const Table = ({ onSort, sorting, classModifier, headers, items, childrenHeader, actionsBody, headersOrderCt }) => (
  <TableToolkit classModifier={classModifier}>
    <Header headers={headers} onSort={onSort} sorting={sorting} headersOrderCt={headersOrderCt}>
      {childrenHeader}
    </Header>
    <Body items={items} actions={actionsBody} />
  </TableToolkit>
);

Table.propTypes = {
  headers: HeadersPropTypes.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  classModifier: PropTypes.string,
  headersOrderCt: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

Table.defaultProps = {
  classModifier: '',
  headersOrderCt: { NONE, DESCENDING, ASCENDING },
};

export default Table;
