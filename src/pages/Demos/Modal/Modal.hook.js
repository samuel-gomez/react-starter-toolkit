import { useState, useCallback } from 'react';

const useToggleModalConfirm = (initStateModal = false) => {
  const [isOpenModalConfirm, setStateToggleModalConfirm] = useState(initStateModal);

  const closeModalConfirm = useCallback(() => {
    setStateToggleModalConfirm(false);
  }, []);

  const openModalConfirm = useCallback(() => {
    setStateToggleModalConfirm(true);
  }, []);

  return { closeModalConfirm, openModalConfirm, isOpenModalConfirm };
};

export default useToggleModalConfirm;
