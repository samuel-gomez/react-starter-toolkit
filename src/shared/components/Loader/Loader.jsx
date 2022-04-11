import React from 'react';
import { string, node } from 'prop-types';
import WithClassNameModifier from 'shared/hoc/WithClassNameModifier';
import './Loader.scss';

const Loader = WithClassNameModifier(({ className, isVisible, message, children }) => (
  <div className={className}>{isVisible ? <p className="af-loader__spinner">{message}</p> : children}</div>
));

const LoaderPropTypes = {
  className: string,
  children: node,
};

const LoaderDefaultProps = {
  className: 'af-loader',
  children: null,
};

Loader.propTypes = LoaderPropTypes;
Loader.defaultProps = LoaderDefaultProps;

export default Loader;
