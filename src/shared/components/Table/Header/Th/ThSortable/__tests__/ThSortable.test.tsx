import { renderWithContainer } from 'shared/testsUtils';
import ThSortable from '../ThSortable';

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
