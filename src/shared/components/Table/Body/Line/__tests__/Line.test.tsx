import { renderWithContainer } from 'shared/testsUtils';
import Line from '../Line';

const container = document.createElement('tbody');

const columnsMock = [
  {
    hover: undefined,
    keyCol: 'sexe',
    label: 'F',
  },
];

describe('Line', () => {
  it.each`
    columns        | className    | classModifier | children
    ${undefined}   | ${undefined} | ${undefined}  | ${undefined}
    ${[]}          | ${undefined} | ${undefined}  | ${undefined}
    ${columnsMock} | ${undefined} | ${undefined}  | ${undefined}
    ${columnsMock} | ${undefined} | ${'modifier'} | ${undefined}
    ${columnsMock} | ${'myclass'} | ${'modifier'} | ${(<td>child</td>)}
  `(
    'Should render <Line/> when columns: $columns, className: $className, classModifier: $classModifier, children: $children',
    ({ columns, className, classModifier, children }) => {
      const { baseElement } = renderWithContainer(
        <Line className={className} columns={columns} classModifier={classModifier}>
          {children}
        </Line>,
        container,
      );
      expect(baseElement).toMatchSnapshot();
    },
  );
});
