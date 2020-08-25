import { renderHook, act } from '@testing-library/react-hooks';
import { useToggleModalDuplicate, useToggleModalDelete } from './MembersLine.hook';

describe('useToggleModalDuplicate', () => {
  it('Should isOpenModalDuplicate to be false when closeModalDuplicate called', () => {
    const { result } = renderHook(() => useToggleModalDuplicate());
    act(() => result.current.closeModalDuplicate());
    const resIsOpenModal = result.current.isOpenModalDuplicate;
    expect(resIsOpenModal).toBe(false);
  });

  it('Should isOpenModalDuplicate to be true when openModalDuplicate called', () => {
    const { result } = renderHook(() => useToggleModalDuplicate());
    act(() => result.current.openModalDuplicate());
    const resIsOpenModal = result.current.isOpenModalDuplicate;
    expect(resIsOpenModal).toBe(true);
  });
});

describe('useToggleModalDelete', () => {
  it('Should isOpenModalDelete to be false when closeModalDelete called', () => {
    const { result } = renderHook(() => useToggleModalDelete());
    act(() => result.current.closeModalDelete());
    const resIsOpenModal = result.current.isOpenModalDelete;
    expect(resIsOpenModal).toBe(false);
  });

  it('Should isOpenModalDelete to be true when openModalDelete called', () => {
    const { result } = renderHook(() => useToggleModalDelete());
    act(() => result.current.openModalDelete());
    const resIsOpenModal = result.current.isOpenModalDelete;
    expect(resIsOpenModal).toBe(true);
  });
});
