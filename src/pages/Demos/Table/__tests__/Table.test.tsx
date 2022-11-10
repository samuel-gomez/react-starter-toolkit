import { clearString, renderWithWrapperStaticRouter } from 'shared/testsUtils';
import Table, { code, generateItems } from '../Table';

describe('<Table />', () => {
  it('Should render Table', () => {
    const { asFragment } = renderWithWrapperStaticRouter(<Table />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('code', () => {
  const onChange = jest.fn();

  const defaultProps = {
    classModifier: '',
    className: 'af-table',
    headers: [
      { label: 'Prénom', id: 'firstname' },
      {
        label: `<span><strong>Nom</strong>
    <i className="glyphicon glyphicon-ok"></i></span>`,
        id: 'lastname',
      },
      { label: 'Date de naissance', id: 'birthdate' },
    ],
    items: generateItems(),

    onChange,
  };

  it('Should render Table with default props', () => {
    const result = code(defaultProps);
    expect(clearString(result)).toEqual(
      clearString(`
      <Table className="${defaultProps.className}" classModifier="${defaultProps.classModifier}">
        <Table.Header>
          <Table.Tr>
            {headers.map(item => <Table.Th key={item.id}>
              <span className="af-table-th-content">{item.label}</span>
            </Table.Th>)}
          </Table.Tr>
        </Table.Header>
        <Table.Body>
          {items.map(item => <Table.Tr key={item.id}>
            {item.cells.map(cell => <Table.Td key={cell.id}>
              <span className="af-table-th-content">{cell.label}</span>
            </Table.Td>) }     
          </Table.Tr>)}
        </Table.Body>
      </Table>       
      `),
    );
  });
});
