import React from 'react';
import { string } from 'prop-types';
import WithClassNameModifier from 'shared/helpers/WithClassNameModifier';
import './Skeleton.scss';

const Skeleton = WithClassNameModifier(({ className }) => <div aria-busy="true" aria-label="loader" role="status" className={className} />);

Skeleton.propTypes = {
  className: string,
};

Skeleton.defaultProps = {
  className: 'af-skeleton',
};

export default Skeleton;
