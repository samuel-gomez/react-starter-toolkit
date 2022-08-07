import { render } from '@testing-library/react';
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
  it('Render <TableContainer/> with no item and no header', () => {
    render(<TableContainer {...defaultProps} />);
    expect(TableCmpt).not.toHaveBeenCalled();
  });
});
