import React from 'react';
import withClassModifier from '@axa-fr/react-toolkit-core/dist/withClassModifier.hoc';
import withClassDefault from '@axa-fr/react-toolkit-core/dist/withClassDefault.hoc';
import compose from 'shared/helpers/compose';
import './Skeleton.scss';

export const Skeleton = ({ className }) => <div aria-busy="true" aria-label="loader" role="status" className={className} />;

const enhance = compose(withClassDefault('af-skeleton'), withClassModifier);

export default enhance(Skeleton);
