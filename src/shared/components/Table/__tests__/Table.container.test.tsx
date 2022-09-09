import { render, screen } from '@testing-library/react';
import TableContainer from '../Table.container';

const TableCmpt = jest.fn();

const defaultProps = {
  TableCmpt,
};

describe('TableContainer', () => {
  const headers = [
    {
      label: 'label',
      key: 'uid',
      field: 'name',
    },
  ];

  const items = [
    {
      key: 'uid',
      cols: {
        name: {
          label: 'samuel',
        },
      },
    },
  ];

  it('Render <TableContainer/> with 1 header and 1 item', () => {
    render(<TableContainer {...defaultProps} items={items} headers={headers} />);
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        children: undefined,
        headers,
        items,
      },
      {},
    );
  });

  it('Render <TableContainer/> with 1 header and 1 item without headers', () => {
    render(<TableContainer {...defaultProps} items={items} />);
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        children: undefined,
        headers: [],
        items,
      },
      {},
    );
  });

  it('Render <TableContainer/> with 1 header and 0 item', () => {
    render(<TableContainer {...defaultProps} items={[]} headers={headers} />);
    expect(TableCmpt).not.toHaveBeenCalled();
  });

  it('Render <TableContainer/> with 1 header and 1 item and children', () => {
    render(
      <TableContainer {...defaultProps} items={items} headers={headers}>
        <tr>
          <td>hello</td>
        </tr>
      </TableContainer>,
    );
    expect(TableCmpt).toHaveBeenCalledWith(
      {
        children: (
          <tr>
            <td>hello</td>
          </tr>
        ),
        headers,
        items,
      },
      {},
    );
  });

  it('Render <TableContainer/> with no item and no header', () => {
    render(<TableContainer {...defaultProps} />);
    expect(TableCmpt).not.toHaveBeenCalled();
  });

  it('Render <TableContainer/> with Table view and children', () => {
    render(<TableContainer items={items} headers={headers} />);
    expect(screen.getByText('samuel')).toBeInTheDocument();
  });
});
