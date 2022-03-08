import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableContainer from '../Table.container';

const defaultProps = {
  items: [],
  onSort: jest.fn(),
};

describe('TableContainer', () => {
  it('Render <TableContainer/> without props', () => {
    const { asFragment } = render(<TableContainer onSort={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <TableContainer/> with empty items', () => {
    const { asFragment } = render(<TableContainer {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

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
      name: {
        label: 'samuel',
      },
    },
  ];

  it('Render <TableContainer/> with 1 header and 1 item', () => {
    const { asFragment } = render(<TableContainer {...defaultProps} items={items} headers={headers} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
