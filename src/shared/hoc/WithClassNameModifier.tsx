import { ComponentType } from 'react';
import { ClassManager } from '@axa-fr/react-toolkit-core';

export type TwithClassNameModifier = {
  className?: string;
  classModifier?: string;
  defaultClassName?: string;
};

const withClassNameModifier = <P extends object>(
  Component: ComponentType<P>,
  defaultProps?: Partial<P>,
  displayName = '',
): ComponentType<P & TwithClassNameModifier> => {
  const Hoc = ({ className = '', classModifier = '', defaultClassName = '', ...props }: TwithClassNameModifier & P) => (
    <Component {...(props as P)} className={ClassManager.getComponentClassName(className, classModifier, defaultClassName)} />
  );

  Hoc.displayName = `WithClassModifier(${Component.name || Component.displayName || displayName}`;
  Hoc.defaultProps = defaultProps || {};
  return Hoc;
};

export default withClassNameModifier;
