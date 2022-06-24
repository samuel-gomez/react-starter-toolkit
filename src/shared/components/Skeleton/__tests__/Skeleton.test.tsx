import { render } from '@testing-library/react';
import Skeleton from '../Skeleton';

describe('<Skeleton/>', () => {
  it('Render <Skeleton/> with default className', () => {
    const { asFragment, container } = render(<Skeleton />);
    expect(container.querySelector('.af-skeleton')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <Skeleton/> with other className', () => {
    const { asFragment, container } = render(<Skeleton className="other" />);
    expect(container.querySelector('.other')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Render <Skeleton/> with other className and custom modifier', () => {
    const { asFragment, container } = render(<Skeleton className="other" classModifier="custom" />);

    expect(container.querySelector('.other--custom')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain className .af-skeleton--loader when render Skelelon with "loader" classModifier', () => {
    const { asFragment, getByRole, container } = render(<Skeleton classModifier="loader" />);
    expect(getByRole('status')).toBeDefined();
    expect(container.querySelector('.af-skeleton--loader')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
