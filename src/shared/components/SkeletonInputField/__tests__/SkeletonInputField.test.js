import React from 'react';
import { render } from '@testing-library/react';
import SkeletonInputField from '..';

describe('<SkeletonInputField/>', () => {
  it('Render <SkeletonInputField/>', () => {
    const { asFragment } = render(<SkeletonInputField />);
    expect(asFragment()).toMatchSnapshot();
  });
});
