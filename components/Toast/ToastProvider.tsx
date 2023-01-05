import * as React from 'react';
import { useCallback, useState } from 'react';
import Toast from './index';

interface ToastProviderProps {
  children?: React.ReactNode;
}
const noop = (): void => undefined;
const TOAST_TIMEOUT = 150000;
let timerId: NodeJS.Timeout;

export const ToastContext = React.createContext<{
  show: (message: string, isError?: boolean) => void;
}>({ show: noop });

const ToastProvider = ({
  children,
}: ToastProviderProps): React.ReactElement<ToastProviderProps> => {
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [isError, setError] = useState(false);

  const show = useCallback((message: string, isError?: boolean): (() => void) => {
    // clear the previous timer and add new set timer
    clearTimeout(timerId);

    timerId = setTimeout(() => setVisible(false), TOAST_TIMEOUT);

    setError(!!isError);
    setContent(message);
    setVisible(true);

    return (): void => clearTimeout(timerId);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast title={content} visible={visible} iconProps={{}} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

ToastProvider.displayName = 'Toast';
