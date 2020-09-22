import React from 'react';
import PropTypes from 'prop-types';
import PATH from './constants';

const StorybookIcon = ({ path }) => (
  <svg className="af-btn__img" viewBox="0 0 9.6 12">
    <path d={path} />
  </svg>
);
StorybookIcon.propTypes = {
  path: PropTypes.string,
};
StorybookIcon.defaultProps = {
  path: PATH,
};

export default StorybookIcon;
