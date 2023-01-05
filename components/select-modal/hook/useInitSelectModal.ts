import { useContext, useEffect } from 'react';
import { SelectModalContext } from '../provider';

const useInitSelectModal = (id: string) => {
  const { initModal, clearModal } = useContext(SelectModalContext);

  useEffect(() => {
    initModal(id);

    return () => {
      clearModal(id);
    };
  }, [id]);
};

export default useInitSelectModal;
