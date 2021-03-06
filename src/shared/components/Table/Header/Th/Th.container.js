import React from 'react';
import PropTypes from 'prop-types';
import ThSortable from './ThSortable';
import Th from './Th';

export const ThEnhanced = ({ field, sorting, onSort, ...rest }) =>
  field ? <ThSortable {...rest} sorting={sorting} onSort={onSort} field={field} /> : <Th {...rest} />;

const ThEnhancedPropTypes = {
  field: PropTypes.string,
};

const ThEnhancedDefaultProps = {
  field: '',
};

ThEnhanced.propTypes = ThEnhancedPropTypes;
ThEnhanced.defaultProps = ThEnhancedDefaultProps;

export default ThEnhanced;
