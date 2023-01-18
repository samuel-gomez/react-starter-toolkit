import { ComponentType } from 'react';
import { ClassManager } from '@axa-fr/react-toolkit-core';

type TwithClassModifier = {
  className?: string;
  classModifier?: string;
  defaultClassName?: string;
};

const withClassNameModifier =
  <P extends object>(Component: ComponentType<P>, classNameDefault = ''): ComponentType<P & TwithClassModifier> =>
  ({ className = classNameDefault, classModifier = '', defaultClassName = '', ...props }: TwithClassModifier) =>
    <Component {...(props as P)} className={ClassManager.getComponentClassName(className, classModifier, defaultClassName)} />;

export default withClassNameModifier;
