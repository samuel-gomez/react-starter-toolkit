import React from 'react';
import { render } from '@testing-library/react';
import Skeleton from '../Skeleton';

describe('<Skeleton/>', () => {
  it('Render <Skeleton/>', () => {
    const { asFragment } = render(<Skeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should contain .af-skeleton', () => {
    const { getByRole, container } = render(<Skeleton classModifier="loader" />);
    expect(getByRole('status')).toBeDefined();
    expect(container.querySelector('.af-skeleton--loader')).toBeDefined();
  });
});
