import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import { ReactNode } from 'react';
import './Loader.scss';

type TLoader = WithClassModifierOptions & {
  className?: string;
  isVisible?: boolean;
  message?: string;
  children?: ReactNode;
};

const Loader = ({ className, isVisible, message, children }: TLoader) => (
  <div className={className}>{isVisible ? <p className="af-loader__spinner">{message}</p> : children}</div>
);

const enhance = compose(identity<TLoader>(), withClassDefault('af-loader'), withClassModifier());
const Enhanced = enhance(Loader);
Enhanced.displayName = 'Skeleton';

export default Enhanced;
