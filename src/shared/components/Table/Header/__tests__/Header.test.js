import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

const defaultProps = {
  headers: [],
  actionsHeader: null,
  onSort: jest.fn(),
  sorting: {},
  children: null,
};
const container = document.createElement('table');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('Header', () => {
  it('Render <Header/> with empty headers', () => {
    const { asFragment } = renderWithContainer(() => <Header {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  const headers = [
    {
      label: 'label',
      key: 'uid',
      field: 'name',
    },
  ];

  const sorting = {
    field: 'name',
    order: true,
  };

  it('Render <Header/> with 1 header', () => {
    const { asFragment } = renderWithContainer(() => <Header {...defaultProps} headers={headers} sorting={sorting} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Render <Header/> with 1 header and 1 item and child Header', () => {
    const { asFragment } = renderWithContainer(() => (
      <Header {...defaultProps} headers={headers}>
        <th>child header</th>
      </Header>
    ));
    expect(asFragment()).toMatchSnapshot();
  });
});
