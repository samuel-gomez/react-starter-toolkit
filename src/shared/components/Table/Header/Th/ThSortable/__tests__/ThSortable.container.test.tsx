import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { ASCENDING } from 'shared/components/Table/constants';
import ThSortableContainer, { toggleOrder, toggleSorting, setOrder, setClassModifierActive, setSort } from '../ThSortable.container';

describe('setClassModifierActive', () => {
  it('Should return "classModifier" when setClassModifierActive have been called without props', () => {
    const result = setClassModifierActive({});
    expect(result).toEqual('');
  });
  it('Should return "classModifier" when isActive equal false', () => {
    const result = setClassModifierActive({ classModifier: 'classModifier', isActive: false });
    expect(result).toEqual('classModifier');
  });
  it('Should return "classModifier active" when isActive equal true', () => {
    const result = setClassModifierActive({ classModifier: 'classModifier', isActive: true });
    expect(result).toEqual('classModifier active');
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

describe('setSort', () => {
  const onSort = jest.fn().mockReturnValue('onSortResult');
  const toggleSortingFn = jest.fn().mockReturnValue('sortByResult');
  const defaultProps = {
    field: '',
    sorting: { field: 'name', order: ASCENDING },
    onSort,
    toggleSortingFn,
  } as const;
  it('Should return 1 when receive -1', () => {
    const result = setSort(defaultProps)();
    expect(result).toEqual('onSortResult');
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
    ${'champ1'} | ${undefined}                      | ${{ field: 'champ1', order: 1 }}
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

const onSort = jest.fn().mockReturnValue('ordering');
const ThSortableCmpt = jest.fn().mockImplementation(({ children }: { children: ReactNode }) => (
  <>
    ThSortableCmpt
    {children}
  </>
));

const setClassModifierActiveFn = jest.fn();
const setSortFn = jest.fn();

const defaultProps = {
  ThSortableCmpt,
  onSort,
  setSortFn,
  setClassModifierActiveFn,
} as const;

describe('<ThSortableContainer />', () => {
  it.each`
    field        | sorting                                | classModifier | isActive | sort               | classModifierActive  | expedtedSorting                        | expectedOrder
    ${'myfield'} | ${undefined}                           | ${'sortable'} | ${true}  | ${'sort function'} | ${'classnameactive'} | ${{ field: 'myfield', order: 'NONE' }} | ${'NONE'}
    ${'myfield'} | ${{ field: '', order: 'NONE' }}        | ${'sortable'} | ${false} | ${'sort function'} | ${'classnameactive'} | ${{ field: '', order: 'NONE' }}        | ${'NONE'}
    ${'myfield'} | ${{ field: '', order: -1 }}            | ${'sortable'} | ${false} | ${'sort function'} | ${'classnameactive'} | ${{ field: '', order: -1 }}            | ${'NONE'}
    ${'myfield'} | ${{ field: 'myfield', order: 'NONE' }} | ${'sortable'} | ${true}  | ${'sort function'} | ${'classnameactive'} | ${{ field: 'myfield', order: 'NONE' }} | ${'NONE'}
    ${'myfield'} | ${{ field: 'myfield', order: 1 }}      | ${'sortable'} | ${true}  | ${'sort function'} | ${'classnameactive'} | ${{ field: 'myfield', order: 1 }}      | ${1}
    ${'myfield'} | ${{ field: 'myfield', order: -1 }}     | ${'sortable'} | ${true}  | ${'sort function'} | ${'classnameactive'} | ${{ field: 'myfield', order: -1 }}     | ${-1}
  `(
    'Should render ThSortableContainer view with classModifierActive: $classModifierActive, expectedOrder: $expectedOrder, sort: $sort when field: $field, sorting: $sorting, classModifier: $classModifier ',
    ({ field, sorting, classModifier, isActive, sort, classModifierActive, expectedOrder, expedtedSorting }) => {
      setClassModifierActiveFn.mockReturnValue(classModifierActive);
      setSortFn.mockReturnValue(sort);
      render(<ThSortableContainer {...defaultProps} field={field} sorting={sorting} classModifier={classModifier} />);

      expect(ThSortableCmpt).toHaveBeenCalledWith(
        {
          classModifier: classModifierActive,
          order: expectedOrder,
          sort,
        },
        {},
      );
      expect(setSortFn).toHaveBeenCalledWith({ field, sorting: expedtedSorting, onSort });
      expect(setClassModifierActiveFn).toHaveBeenCalledWith({ classModifier, isActive });
    },
  );
});
