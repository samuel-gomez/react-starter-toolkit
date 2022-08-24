import { useState, useCallback } from 'react';

const useToggleModal = (initState = false) => {
  const [isOpen, setStateToggleModal] = useState(initState);

  const onCancel = useCallback(() => {
    setStateToggleModal(false);
  }, []);

  const openModal = useCallback(() => {
    setStateToggleModal(true);
  }, []);

  return { onCancel, openModal, isOpen };
};
export type TReturnUseToggleModal = ReturnType<typeof useToggleModal>;

export default useToggleModal;
