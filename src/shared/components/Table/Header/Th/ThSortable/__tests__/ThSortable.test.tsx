import { render } from '@testing-library/react';
import { renderWithContainer } from 'shared/testsUtils';
import ThSortable, { SortingIcon } from '../ThSortable';

const defaultProps = {
  sort: jest.fn(),
};
const container = document.createElement('tr');

describe('ThSortable', () => {
  it.each`
    order     | children     | classModifier
    ${''}     | ${undefined} | ${undefined}
    ${'NONE'} | ${undefined} | ${undefined}
    ${'NONE'} | ${'child'}   | ${undefined}
    ${'NONE'} | ${'child'}   | ${'variant'}
    ${1}      | ${'child'}   | ${'variant'}
    ${-1}     | ${'child'}   | ${'variant'}
  `(
    'Should render <ThSortable/> when order: $order, children: $children, className: $className, classModifier: $classModifier',
    ({ children, ...rest }) => {
      const { baseElement } = renderWithContainer(
        <ThSortable {...defaultProps} {...rest}>
          {children}
        </ThSortable>,
        container,
      );

      expect(baseElement).toMatchSnapshot();
    },
  );
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
