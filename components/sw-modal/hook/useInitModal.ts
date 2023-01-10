import { useContext, useEffect } from 'react';
import { ModalContext } from '../provider';

const useInitModal = (id: string) => {
  const { initModal, clearModal } = useContext(ModalContext);

  useEffect(() => {
    initModal(id);

    return () => {
      clearModal(id);
    };
  }, [id]);
};

export default useInitModal;
