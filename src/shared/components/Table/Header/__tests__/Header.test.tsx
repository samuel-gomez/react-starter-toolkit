import { renderWithContainer } from 'shared/testsUtils';
import Header from '../Header';

const defaultProps = {
  onSort: jest.fn(),
};

const container = document.createElement('table');

const headersMock = [
  {
    label: 'label',
    key: 'uid',
    field: 'name',
  },
];
const sortingMock = {
  field: 'name',
  order: 1,
};

describe('Header', () => {
  it.each`
    headers        | sorting        | children
    ${undefined}   | ${undefined}   | ${undefined}
    ${[]}          | ${undefined}   | ${undefined}
    ${headersMock} | ${undefined}   | ${undefined}
    ${headersMock} | ${sortingMock} | ${undefined}
    ${undefined}   | ${sortingMock} | ${undefined}
    ${headersMock} | ${sortingMock} | ${(<th>child header</th>)}
  `('Should render Header when headers: $headers, sorting: $sorting', ({ headers, sorting, children }) => {
    const { baseElement } = renderWithContainer(
      <Header {...defaultProps} headers={headers} sorting={sorting}>
        {children}
      </Header>,
      container,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
