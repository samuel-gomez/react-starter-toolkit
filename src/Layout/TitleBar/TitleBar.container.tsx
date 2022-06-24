import { ComponentProps } from 'react';
import TitleBar, { DEFAULT_CLASSNAME } from './TitleBar';

type TTitleBarContainer = ComponentProps<typeof TitleBar> & {
  TitleBarCmpt?: typeof TitleBar;
};

const TitleBarContainer = ({ backHome = false, classModifier = '', className = DEFAULT_CLASSNAME, ...rest }: TTitleBarContainer) => {
  const newClassModifier = [classModifier, backHome ? 'backhome' : ''].join(' ').trim();
  return <TitleBar {...rest} backHome={backHome} classModifier={newClassModifier} className={className} />;
};

export default TitleBarContainer;
