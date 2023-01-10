import React, { useCallback, useState } from 'react';
import type { SwModalFuncProps } from '../SwModal';
import type { SwConfirmDialogProps } from '../SwConfirmDialog';
import SwConfirmDialog from '../SwConfirmDialog';

interface ModalContextType {
  initModal: (id: string) => void;
  clearModal: (id: string) => void;
  checkActive: (id: string) => boolean;
  activeModal: (id: string) => void;
  inactiveModal: (id: string) => void;
  addConfirmModal: (props: SwModalFuncProps) => void;
}

interface ModalContextProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const ModalContext = React.createContext({} as ModalContextType);
export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [externalList, setExternalList] = useState<SwConfirmDialogProps[]>([]);
  const [, setGlobalList] = useState<string[]>([]);
  const [visibleList, setVisibleList] = useState<string[]>([]);

  const initModal = useCallback((id: string) => {
    setGlobalList((prevState) => {
      const result = [...prevState];
      if (!result.includes(id)) {
        result.push(id);
      }

      return result;
    });
  }, []);

  const clearModal = useCallback((id: string) => {
    setGlobalList((prevState) => {
      const result = [...prevState];

      return result.filter((value) => value !== id);
    });

    setVisibleList((prevState) => {
      const result = [...prevState];

      return result.filter((value) => value !== id);
    });
  }, []);

  const checkActive = useCallback(
    (id: string): boolean => {
      if (visibleList.length) {
        return visibleList[visibleList.length - 1] === id;
      }

      return false;
    },
    [visibleList],
  );

  const activeModal = useCallback((id: string) => {
    setVisibleList((prevState) => {
      const result = [...prevState].filter((value) => value !== id);
      result.push(id);
      return result;
    });
  }, []);

  const inactiveModal = useCallback((id: string) => {
    setVisibleList((prevState) => [...prevState].filter((value) => value !== id));
  }, []);

  const addConfirmModal = useCallback((_props: SwModalFuncProps) => {
    const { id } = _props;
    const newProps: SwConfirmDialogProps = {
      ..._props,
    };

    setGlobalList((prevState) => {
      const result = [...prevState];
      if (!result.includes(id)) {
        result.push(id);
      }

      return result;
    });

    setExternalList((prevState) => {
      const result = [...prevState];
      const exists = result.find((value) => value.id === id);
      if (exists) {
        const idx = result.indexOf(exists);
        result[idx] = { ...newProps };
      } else {
        result.push({ ...newProps });
      }

      return result;
    });

    setVisibleList((prevState) => {
      const result = [...prevState].filter((value) => value !== id);
      result.push(id);
      return result;
    });
  }, []);

  return (
    <ModalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ initModal, clearModal, activeModal, inactiveModal, checkActive, addConfirmModal }}
    >
      {children}
      {externalList.map((props) => (
        <SwConfirmDialog key={props.id} {...props} />
      ))}
    </ModalContext.Provider>
  );
};
