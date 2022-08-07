import { renderWithContainer } from 'shared/testsUtils';
import Line from '../Line';

const container = document.createElement('tbody');

const columns = [
  {
    hover: undefined,
    keyCol: 'sexe',
    label: 'F',
  },
];

describe('Line', () => {
  it.each`
    columns      | className    | modifier      | children
    ${undefined} | ${undefined} | ${undefined}  | ${undefined}
    ${[]}        | ${undefined} | ${undefined}  | ${undefined}
    ${columns}   | ${undefined} | ${undefined}  | ${undefined}
    ${columns}   | ${undefined} | ${'modifier'} | ${undefined}
    ${columns}   | ${'myclass'} | ${'modifier'} | ${(<td>child</td>)}
  `(
    'Should render <Line/> when columns: $columns, className: $className, modifier: $modifier, children: $children',
    ({ columns, className, modifier, children }) => {
      const { baseElement } = renderWithContainer(
        <Line className={className} columns={columns} modifier={modifier}>
          {children}
        </Line>,
        container,
      );
      expect(baseElement).toMatchSnapshot();
    },
  );
});
