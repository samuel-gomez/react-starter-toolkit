import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThSortable from './ThSortable';

const defaultProps = {
  children: null,
  sort: jest.fn(),
  className: 'af-table__th af-table__th--sortable',
  sortingIcon: <i className="glyphicon glyphicon-ok" />,
};
const container = document.createElement('tr');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(container),
  });

describe('ThSortable', () => {
  it('Render <ThSortable/>', () => {
    const { asFragment } = renderWithContainer(() => <ThSortable {...defaultProps}>child th</ThSortable>);
    expect(asFragment()).toMatchSnapshot();
  });
});
