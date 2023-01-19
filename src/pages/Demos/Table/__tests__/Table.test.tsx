import { clearString } from 'shared/testsUtils';
import { code, generateItems } from '../Table';

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
            <Table.Th key="firstname">
              <span className="af-table-th-content">Prénom</span>  
            </Table.Th>  
            <Table.Th key="lastname">  
              <span className="af-table-th-content"><span><strong>Nom</strong>  
              <i className="glyphicon glyphicon-ok"></i></span></span>  
            </Table.Th>  
            <Table.Th key="birthdate">  
              <span className="af-table-th-content">Date de naissance</span>  
            </Table.Th>
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
