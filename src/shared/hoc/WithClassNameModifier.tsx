import { ComponentType } from 'react';
import { ClassManager } from '@axa-fr/react-toolkit-core';

type TwithClassModifier = {
  className?: string;
  classModifier?: string;
  defaultClassName?: string;
};

export const withClassNameModifier =
  <P extends object>(Component: ComponentType<P>): ComponentType<P & TwithClassModifier> =>
  ({ className = '', classModifier = '', defaultClassName = '', ...props }: TwithClassModifier) =>
    <Component {...(props as P)} className={ClassManager.getComponentClassName(className, classModifier, defaultClassName)} />;

export default withClassNameModifier;
