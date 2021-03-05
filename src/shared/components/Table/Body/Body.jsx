import React from 'react';
import PropTypes from 'prop-types';
import Line from './Line';

const Body = ({ items, actions, children, ariaLabel }) => (
  <tbody className="af-table__body" aria-label={ariaLabel}>
    {items.map(({ key, modifier, ...rest }) => (
      <Line key={key} modifier={modifier} {...rest} actions={actions} idKey={key} />
    ))}
    {children}
  </tbody>
);

Body.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  ariaLabel: PropTypes.string,
};

Body.defaultProps = {
  ariaLabel: 'table-body',
};

export default Body;
