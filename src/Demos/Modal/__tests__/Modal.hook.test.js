import { renderHook, act } from '@testing-library/react-hooks';
import useToggleModalConfirm from '../Modal.hook';

describe('useToggleModalConfirm', () => {
  it('Should isOpenModalConfirm to be false when closeModalConfirm called', () => {
    const { result } = renderHook(() => useToggleModalConfirm());
    act(() => result.current.closeModalConfirm());
    const resIsOpenModal = result.current.isOpenModalConfirm;
    expect(resIsOpenModal).toBe(false);
  });

  it('Should isOpenModalConfirm to be true when openModalConfirm called', () => {
    const { result } = renderHook(() => useToggleModalConfirm());
    act(() => result.current.openModalConfirm());
    const resIsOpenModal = result.current.isOpenModalConfirm;
    expect(resIsOpenModal).toBe(true);
  });
});
