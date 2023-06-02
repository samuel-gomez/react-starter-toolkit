import { renderHook, act } from '@testing-library/react';
import useToggleModal from '../ModalCommon.hook';

describe('useToggleModal', () => {
  it('Should isOpenModal to be false when closeModal called', () => {
    const { result } = renderHook(() => useToggleModal());
    act(() => result.current.onCancel());
    const resIsOpenModal = result.current.isOpen;
    expect(resIsOpenModal).toBe(false);
  });

  it('Should isOpenModal to be true when openModal called', () => {
    const { result } = renderHook(() => useToggleModal());
    act(() => result.current.openModal());
    const resIsOpenModal = result.current.isOpen;
    expect(resIsOpenModal).toBe(true);
  });
});
