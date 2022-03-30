/* eslint no-console: 0 */
import React from 'react';
import { oneOf, string } from 'prop-types';
import { MODES, TEXTS } from './constants';
import Loader from './Loader';

const LoaderContainer = ({ classModifier, text, mode, ...rest }) => {
  const isVisible = mode !== MODES.none;
  const newClassModifier = isVisible ? `${classModifier} active` : classModifier;
  return <Loader {...rest} classModifier={newClassModifier} isVisible={isVisible} message={text || TEXTS[mode]} />;
};

const LoaderContainerPropTypes = {
  mode: oneOf(Object.keys(MODES)),
  text: string,
  classModifier: string,
};

const LoaderContainerDefaultProps = {
  mode: MODES.none,
  text: '',
  classModifier: '',
};

LoaderContainer.propTypes = LoaderContainerPropTypes;
LoaderContainer.defaultProps = LoaderContainerDefaultProps;

export default LoaderContainer;
