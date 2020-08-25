import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { ClassManager } from '@axa-fr/react-toolkit-core';
import TitleBar from './TitleBar';

export default ({ backHome, classModifier, ...rest }) => {
  const newClassName = 'af-title-bar';
  const newClassModifier = `${classModifier || ''}${backHome ? ' backhome' : ''}`;
  const classComponent = ClassManager.getComponentClassName(newClassName, newClassModifier);
  return <TitleBar backHome={backHome} {...rest} className={classComponent} />;
};
