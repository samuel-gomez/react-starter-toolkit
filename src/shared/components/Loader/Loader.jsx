import React from 'react';
import PropTypes from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';
import './Loader.scss';

const Loader = WithClassNameModifier(({ className, isVisible, message, children }) => (
  <div className={className}>
    {children}
    {isVisible && <p className="af-loader__spinner">{message}</p>}
  </div>
));

const LoaderPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const LoaderDefaultProps = {
  className: 'af-loader',
  children: null,
};

Loader.propTypes = LoaderPropTypes;
Loader.defaultProps = LoaderDefaultProps;

export default Loader;
