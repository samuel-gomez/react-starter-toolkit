import { render } from '@testing-library/react';
import SortingIcon, { orderIcons } from '../SortingIcon';

describe('orderIcons', () => {
  it.each`
    order        | expected
    ${undefined} | ${'sorting'}
    ${'NONE'}    | ${'sorting'}
    ${1}         | ${'arrow-xs-up'}
    ${-1}        | ${'arrow-xs-down'}
  `('Should return $expected when orderIcons have been called with order: $order', ({ order, expected }) => {
    const result = orderIcons(order);

    expect(result).toEqual(expected);
  });
});

describe('SortingIcon', () => {
  it('Should render SortingIcon with order equal NONE', () => {
    const { asFragment } = render(<SortingIcon />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render SortingIcon with order equal 1', () => {
    const { asFragment } = render(<SortingIcon order={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should render SortingIcon with order equal -1', () => {
    const { asFragment } = render(<SortingIcon order={-1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
