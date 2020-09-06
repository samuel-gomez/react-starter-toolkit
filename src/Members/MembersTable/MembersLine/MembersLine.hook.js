import { useState, useCallback } from 'react';

export const useToggleModalDuplicate = (initState = false) => {
  const [isOpenModalDuplicate, setStateToggleModalDuplicate] = useState(initState);

  const closeModalDuplicate = useCallback(() => {
    setStateToggleModalDuplicate(false);
  }, []);

  const openModalDuplicate = useCallback(() => {
    setStateToggleModalDuplicate(true);
  }, []);

  return { closeModalDuplicate, openModalDuplicate, isOpenModalDuplicate };
};

export const useToggleModalDelete = (initState = false) => {
  const [isOpenModalDelete, setStateToggleModalDelete] = useState(initState);

  const closeModalDelete = useCallback(() => {
    setStateToggleModalDelete(false);
  }, []);

  const openModalDelete = useCallback(() => {
    setStateToggleModalDelete(true);
  }, []);

  return { closeModalDelete, openModalDelete, isOpenModalDelete };
};
