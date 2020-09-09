import React from 'react';
import { render } from '@testing-library/react';
import { MembersHeaderThEnhanced, toggleOrder, toggleSorting, setOrder } from './MembersHeaderTh.container';

describe('toggleOrder', () => {
  it('Should return 1 when receive -1', () => {
    const result = toggleOrder(-1);
    expect(result).toEqual(1);
  });

  it('Should return -1 when receive 1', () => {
    const result = toggleOrder(1);
    expect(result).toEqual(-1);
  });
});

describe('setOrder', () => {
  it.each`
    field       | prevField   | order | expected
    ${'champ1'} | ${'champ2'} | ${1}  | ${1}
    ${'champ1'} | ${'champ2'} | ${-1} | ${1}
    ${'champ1'} | ${'champ1'} | ${1}  | ${-1}
    ${'champ1'} | ${'champ1'} | ${-1} | ${1}
    ${null}     | ${'champ1'} | ${-1} | ${1}
    ${null}     | ${null}     | ${-1} | ${1}
    ${'champ1'} | ${null}     | ${-1} | ${1}
  `('Should return $expected when field: $field, prevField: $prevField, order: $order', ({ field, prevField, order, expected }) => {
    const result = setOrder({ field, prevField, order });
    expect(result).toEqual(expected);
  });
});

describe('toggleSorting', () => {
  it.each`
    field       | sorting                           | expected
    ${'champ1'} | ${{ field: 'champ2', order: -1 }} | ${{ field: 'champ1', order: 1 }}
    ${'champ1'} | ${{ field: 'champ2', order: 1 }}  | ${{ field: 'champ1', order: 1 }}
    ${'champ2'} | ${{ field: 'champ2', order: 1 }}  | ${{ field: 'champ2', order: -1 }}
    ${null}     | ${{ field: 'champ2', order: 1 }}  | ${{ field: null, order: 1 }}
    ${'champ1'} | ${{ field: null, order: 1 }}      | ${{ field: 'champ1', order: 1 }}
    ${'champ1'} | ${{ field: null, order: null }}   | ${{ field: 'champ1', order: 1 }}
  `('Should return $expected when field: $field, sorting: $sorting', ({ field, sorting, expected }) => {
    const result = toggleSorting({ field, sorting });
    expect(result).toEqual(expected);
  });
});

describe('<MembersHeaderThEnhanced />', () => {
  it('Should render MembersHeaderThEnhanced with no sortable button', () => {
    const tr = document.createElement('tr');
    const defaultProps = { children: 'No sortable', sortingInfo: {}, sorting: { field: 'name', order: 1 } };
    const { asFragment, getByRole } = render(<MembersHeaderThEnhanced {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });
    expect(getByRole('columnheader')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render MembersHeaderThEnhanced with sortable button for firstname column', () => {
    const tr = document.createElement('tr');
    const defaultProps = { children: 'sortable', sortingInfo: { firstname: 1 }, field: 'firstname', sorting: { field: 'name', order: 1 } };
    const { asFragment, container } = render(<MembersHeaderThEnhanced {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });
    expect(container.querySelector('.glyphicon-arrow-xs-up')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should call onSort function', () => {
    const onSortMock = jest.fn().mockReturnValue('ordering');
    const toggleSortingMock = jest.fn();
    const tr = document.createElement('tr');
    const defaultProps = {
      onSort: onSortMock,
      toggleSortingFn: toggleSortingMock,
      children: 'sortable',
      sortingInfo: { firstname: 1 },
      field: 'firstname',
      sorting: { field: 'name', order: 1 },
      sortable: true,
    };

    render(<MembersHeaderThEnhanced {...defaultProps} />, {
      container: document.body.appendChild(tr),
    });

    expect(MembersHeaderThEnhanced({ ...defaultProps }).props.sort()).toEqual('ordering');

    expect(toggleSortingMock).toBeCalled();
  });
});
