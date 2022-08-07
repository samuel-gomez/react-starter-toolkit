import { render } from '@testing-library/react';
import Table from '../Table';

const defaultProps = {
  classModifier: 'classModifier',
  headers: [],
  items: [],
};

describe('Table', () => {
  it('Render <Table/> with empty items', () => {
    const { asFragment } = render(<Table {...defaultProps} />);
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
      cols: {
        name: {
          label: 'samuel',
        },
      },
    },
  ];

  it('Render <Table/> with 1 header and 1 item', () => {
    const { asFragment } = render(<Table {...defaultProps} headers={headers} items={items} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
