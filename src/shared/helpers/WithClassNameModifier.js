import React from 'react';
import { ClassManager } from '@axa-fr/react-toolkit-core';

const WithClassNameModifier = Component => ({ className, classModifier, ...rest }) => {
  const newClassName = ClassManager.getComponentClassName(className, classModifier);
  return <Component className={newClassName} {...rest} />;
};

export default WithClassNameModifier;
