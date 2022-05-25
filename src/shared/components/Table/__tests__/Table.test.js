import { render } from '@testing-library/react';
import Table from '../Table';

const defaultProps = {
  classModifier: 'classModifier',
  headers: [],
  items: [],
  actionsHeader: null,
  actionsBody: null,
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
      name: {
        label: 'samuel',
      },
    },
  ];

  it('Render <Table/> with 1 header and 1 item', () => {
    const { asFragment } = render(<Table {...defaultProps} headers={headers} items={items} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <Table/> with 1 header and 1 item and childrenHeader and actionsBody', () => {
    const childrenHeader = <th>children header</th>;
    const actionsBody = ({ idKey, ...props }) => (
      <p id={idKey} {...props}>
        action body
      </p>
    );
    const { asFragment } = render(
      <Table {...defaultProps} headers={headers} items={items} childrenHeader={childrenHeader} actionsBody={actionsBody} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
