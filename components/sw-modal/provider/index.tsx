import React, { useCallback, useMemo, useState } from 'react';
import type { SwModalFuncProps } from '../SwModal';
import type { SwConfirmDialogProps } from '../SwConfirmDialog';
import SwConfirmDialog from '../SwConfirmDialog';

interface ModalContextType {
  initModal: (id: string) => void;
  clearModal: (id: string) => void;
  clearModals: (ids: string[]) => void;
  checkActive: (id: string) => boolean;
  activeModal: (id: string) => void;
  inactiveModal: (id: string) => void;
  inactiveModals: (ids: string[]) => void;
  inactiveAll: () => void;
  addConfirmModal: (props: SwModalFuncProps) => void;
  addExclude: (id: string) => void;
  removeExclude: (id: string) => void;
  hasActiveModal: boolean;
  data: {
    externalMap: Record<string, SwConfirmDialogProps>;
    globalMap: Record<string, boolean>;
    excludeCheckMap: Record<string, boolean>;
    activeMap: Record<string, number>;
  };
}

interface ModalContextProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

// function forceHideModal(modalId: string) {
//   const modal = document.querySelectorAll(`.modal-id-${modalId} > .ant-sw-modal-wrap`);
//   for (let i = 0; i < modal.length; i++) {
//     const element = modal[i] as HTMLElement;
//     element.style.display = 'none';
//   }
// }

export const ModalContext = React.createContext({} as ModalContextType);
export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [externalMap, setExternalMap] = useState<Record<string, SwConfirmDialogProps>>({});
  const [globalMap, setGlobalMap] = useState<Record<string, boolean>>({});
  const [excludeCheckMap, setExcludeCheckMap] = useState<Record<string, boolean>>({});
  const [activeMap, setActiveMap] = useState<Record<string, number>>({});

  const hasActiveModal = useMemo(
    (): boolean =>
      Object.entries(activeMap).reduce(
        (previousValue, [id, value]) => previousValue || (!!value && globalMap[id]),
        false,
      ),
    [activeMap, globalMap],
  );

  const initModal = useCallback((id: string) => {
    setGlobalMap((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  }, []);

  const clearModal = useCallback((id: string) => {
    setGlobalMap((prevState) => ({
      ...prevState,
      [id]: false,
    }));
    setActiveMap((prevState) => ({
      ...prevState,
      [id]: 0,
    }));
  }, []);

  const clearModals = useCallback(
    (ids: string[]) => {
      setGlobalMap((prevState) => {
        const result = { ...prevState };
        ids.forEach((id) => {
          result[id] = false;
        });
        return result;
      });
    },
    [activeMap],
  );

  const checkActive = useCallback(
    (id: string): boolean => {
      if (activeMap[id]) {
        if (excludeCheckMap[id]) {
          return true;
        }
        const max = Object.values(activeMap).reduce((prev, current) => Math.max(prev, current));
        return activeMap[id] === max;
      }
      return false;
    },
    [activeMap, excludeCheckMap],
  );

  const activeModal = useCallback((id: string) => {
    setActiveMap((prevState) => {
      const result = { ...prevState };
      const max = Object.values(prevState).reduce((prev, current) => Math.max(prev, current), 1);
      result[id] = max + 1;

      return result;
    });
  }, []);

  const inactiveModal = useCallback((id: string) => {
    setActiveMap((prevState) => ({
      ...prevState,
      [id]: 0,
    }));
  }, []);

  const inactiveModals = useCallback((ids: string[]) => {
    setActiveMap((prevState) => {
      const result = { ...prevState };
      ids.forEach((id) => {
        result[id] = 0;
      });
      return result;
    });
  }, []);

  const inactiveAll = useCallback(() => {
    setActiveMap((prevState) => {
      const result = { ...prevState };
      const keys = Object.keys(result);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        result[key] = 0;
      }
      return result;
    });
  }, []);

  const addConfirmModal = useCallback((_props: SwModalFuncProps) => {
    const { id } = _props;
    const newProps: SwConfirmDialogProps = {
      ..._props,
    };

    setGlobalMap((prevState) => ({
      ...prevState,
      [id]: true,
    }));

    setExternalMap((prevState) => ({
      ...prevState,
      [id]: newProps,
    }));

    setActiveMap((prevState) => {
      const result = { ...prevState };
      const max = Object.values(prevState).reduce((prev, current) => Math.max(prev, current), 1);
      result[id] = max + 1;

      return result;
    });
  }, []);

  const addExclude = useCallback((id: string) => {
    setExcludeCheckMap((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  }, []);

  const removeExclude = useCallback((id: string) => {
    setExcludeCheckMap((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  }, []);

  return (
    <ModalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        initModal,
        clearModal,
        clearModals,
        activeModal,
        inactiveModal,
        inactiveModals,
        inactiveAll,
        checkActive,
        hasActiveModal,
        addConfirmModal,
        addExclude,
        removeExclude,
        // TODO: need to remove
        data: {
          externalMap,
          activeMap,
          globalMap,
          excludeCheckMap,
        },
      }}
    >
      {children}
      {Object.values(externalMap).map((props) => (
        <SwConfirmDialog key={props.id} {...props} />
      ))}
    </ModalContext.Provider>
  );
};
