import { useContext, useEffect } from 'react';
import { ModalContext } from '../provider';

const useExcludeModal = (id: string) => {
  const { addExclude, removeExclude } = useContext(ModalContext);

  useEffect(() => {
    addExclude(id);

    return () => {
      removeExclude(id);
    };
  }, [id]);
};

export default useExcludeModal;
