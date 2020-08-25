import React from 'react';
import Skeleton from 'shared/components/Skeleton';

const SkeletonInputField = ({ label }) => (
  <div className="row af-form__group">
    <div className="col-md-2">
      <label className="af-form__group-label">{label}</label>
    </div>
    <Skeleton />
  </div>
);

export default SkeletonInputField;
