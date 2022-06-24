import { withClassDefault, withClassModifier, WithClassModifierOptions, compose, identity } from '@axa-fr/react-toolkit-core';
import './Skeleton.scss';

type TSkeleton = {
  className?: string;
} & WithClassModifierOptions;

const DEFAULT_CLASSNAME = 'af-skeleton';

const Skeleton = ({ className }: TSkeleton) => <div aria-busy="true" aria-label="loader" role="status" className={className} />;

const enhance = compose(identity<TSkeleton>(), withClassDefault(DEFAULT_CLASSNAME), withClassModifier());

const Enhanced = enhance(Skeleton);
Enhanced.displayName = 'Skeleton';

export default Enhanced;
