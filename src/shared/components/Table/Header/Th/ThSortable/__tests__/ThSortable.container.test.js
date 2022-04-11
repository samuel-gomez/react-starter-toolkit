import React from 'react';
import { render } from '@testing-library/react';
import ThSortableContainer, { toggleOrder, toggleSorting, setOrder, SortingIcon, setClassModifierActive } from '../ThSortable.container';

describe('setClassModifierActive', () => {
  it('Should return "classModifier" when isActive equal false', () => {
    const result = setClassModifierActive({ classModifier: 'classModifier', isActive: false });
    expect(result).toEqual('classModifier');
  });
  it('Should return "classModifier active" when isActive equal true', () => {
    const result = setClassModifierActive({ classModifier: 'classModifier', isActive: true });
    expect(result).toEqual('classModifier active');
  });
});

describe('SortingIcon', () => {
  it('Should render SortingIcon with order equal NONE', () => {
    const { asFragment } = render(<SortingIcon order="NONE" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render SortingIcon with order equal true', () => {
    const { asFragment } = render(<SortingIcon order />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('Should render SortingIcon with order equal false', () => {
    const { asFragment } = render(<SortingIcon order={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

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

const containerTr = document.createElement('tr');

const renderWithContainer = Component =>
  render(<Component />, {
    container: document.body.appendChild(containerTr),
  });

const onSortMock = jest.fn().mockReturnValue('ordering');
const defaultProps = { children: 'sortable', sortable: false, onSort: onSortMock, field: '', sorting: { field: '', order: 'NONE' } };

describe('<ThSortableContainer />', () => {
  it('Should render ThSortableContainer with no sortable button', () => {
    const { asFragment, getByRole } = renderWithContainer(() => <ThSortableContainer {...defaultProps} />);
    expect(getByRole('button')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render ThSortableContainer with sortable button for firstname column', () => {
    const { asFragment, container } = renderWithContainer(() => (
      <ThSortableContainer {...defaultProps} sortable sorting={{ field: 'name', order: true }} field="name">
        sortable
      </ThSortableContainer>
    ));
    expect(container.querySelector('.glyphicon-arrow-xs-up')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should call onSort function', () => {
    const toggleSortingMock = jest.fn();
    const setSortingIconMock = jest.fn();
    const setClassModifierActiveMock = jest.fn().mockReturnValue('classnameactive');

    const defaultPropsOverride = {
      ...defaultProps,
      toggleSortingFn: toggleSortingMock,
      setSortingIconFn: setSortingIconMock,
      setClassModifierActiveFn: setClassModifierActiveMock,
      sortable: true,
    };

    renderWithContainer(() => <ThSortableContainer {...defaultPropsOverride} />);

    expect(ThSortableContainer({ ...defaultPropsOverride }).props.sort()).toEqual('ordering');

    expect(toggleSortingMock).toBeCalled();
  });
});
