import React, { useCallback, useState } from 'react';

interface SelectModalContextType {
  initModal: (id: string) => void;
  clearModal: (id: string) => void;
  checkActive: (id: string) => boolean;
  activeModal: (id: string) => void;
  inactiveModal: (id: string) => void;
}

interface SelectModalContextProviderProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const SelectModalContext = React.createContext({} as SelectModalContextType);

export const SelectModalContextProvider = ({ children }: SelectModalContextProviderProps) => {
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

  const activeModal = useCallback(
    (id: string) => {
      setVisibleList((prevState) => {
        const result = [...prevState].filter((value) => value !== id);
        result.push(id);
        return result;
      });
    },
    [visibleList],
  );

  const inactiveModal = useCallback(
    (id: string) => {
      setVisibleList((prevState) => [...prevState].filter((value) => value !== id));
    },
    [visibleList],
  );

  return (
    <SelectModalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ initModal, clearModal, activeModal, inactiveModal, checkActive }}
    >
      {children}
    </SelectModalContext.Provider>
  );
};
