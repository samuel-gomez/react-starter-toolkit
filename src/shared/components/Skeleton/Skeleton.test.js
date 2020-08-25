import React from 'react';
import { render } from '@testing-library/react';
import SkeletonEnhanced, { Skeleton } from './Skeleton';

describe('<SkeletonEnhanced/>', () => {
  it('Render <SkeletonEnhanced/>', () => {
    const { asFragment } = render(<SkeletonEnhanced />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should contain .af-skeleton', () => {
    const { getByRole, container } = render(<SkeletonEnhanced classModifier="loader" />);
    expect(getByRole('status')).toBeDefined();
    expect(container.querySelector('.af-skeleton--loader')).toBeDefined();
  });
});

describe('<Skeleton/>', () => {
  it('Render <Skeleton/>', () => {
    const { asFragment } = render(<Skeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should contain .af-skeleton', () => {
    const { getByRole, container } = render(<Skeleton className="af-test" />);
    expect(getByRole('status')).toBeDefined();
    expect(container.querySelector('.af-test')).toBeDefined();
  });
});
