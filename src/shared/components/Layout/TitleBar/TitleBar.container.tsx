import { ComponentProps } from 'react';
import TitleBar, { DEFAULT_CLASSNAME } from './TitleBar';

type TTitleBarContainer = ComponentProps<typeof TitleBar> & {
  TitleBarCmpt?: typeof TitleBar;
  fullScreen?: boolean;
};

const TitleBarContainer = ({ fullScreen, backHome = false, classModifier = '', className = DEFAULT_CLASSNAME, ...rest }: TTitleBarContainer) => {
  const newClassModifier = [classModifier, backHome ? 'backhome' : '', fullScreen ? 'fullscreen' : ''].join(' ').trim();
  return <TitleBar {...rest} backHome={backHome} classModifier={newClassModifier} className={className} />;
};

export default TitleBarContainer;
