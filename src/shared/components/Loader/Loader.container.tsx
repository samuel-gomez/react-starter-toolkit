import { ComponentProps } from 'react';
import { MODES, TEXTS } from './constants';
import Loader from './Loader';

type TLoaderContainer = Omit<ComponentProps<typeof Loader>, 'isVisible' | 'message'> & {
  classModifier?: string;
  text?: string;
  mode: keyof typeof MODES;
  LoaderCmpt?: typeof Loader;
};

const LoaderContainer = ({ classModifier = '', text = '', mode = MODES.none, LoaderCmpt = Loader, ...rest }: TLoaderContainer) => {
  const isVisible = mode !== MODES.none;
  const newClassModifier = isVisible ? `${classModifier} active` : classModifier;
  return <LoaderCmpt {...rest} classModifier={newClassModifier} isVisible={isVisible} message={text || TEXTS[mode]} />;
};

export default LoaderContainer;
