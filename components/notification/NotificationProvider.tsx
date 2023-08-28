import { useCallback, useRef } from 'react';
import * as React from 'react';
import { notification } from '..';
import type { NotificationPlacement } from './interface';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
interface NotificationProviderProps {
  children?: React.ReactNode;
}
const noop = (): void => undefined;

export interface NotificationProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  duration?: number | null;
  placement?: NotificationPlacement;
  update?: () => void;
  btn?: React.ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
  closeIcon?: React.ReactNode;
  type?: NotificationType;
  direction?: 'horizontal' | 'vertical';
  closable?: boolean;
  key?: React.Key;
}

export const NotificationContext = React.createContext<{
  showNotification: (notificationProps: NotificationProps) => void;
  closeNotification: (key?: React.Key) => void;
}>({ showNotification: noop, closeNotification: noop });

const NotificationProvider = ({
  children,
}: NotificationProviderProps): React.ReactElement<NotificationProviderProps> => {
  const [api, contextHolder] = notification.useNotification();

  const timeoutMapRef = useRef<Record<React.Key, NodeJS.Timer>>({});

  const showNotification = useCallback(
    (notificationProps: NotificationProps) => {
      const {
        message,
        description,
        icon,
        style,
        duration = 1.5,
        placement = 'top',
        direction,
        btn,
        onClick,
        onClose,
        className,
        closeIcon,
        type,
        update,
        closable,
        key: _key,
      } = notificationProps;

      const key = _key || Date.now();

      const controlTimeout = () => {
        const map = timeoutMapRef.current;
        if (map[key]) {
          clearTimeout(map[key]);
          delete map[key];
        }

        if (duration) {
          map[key] = setTimeout(() => {
            api.destroy(key);
          }, duration * 1000);
        }

        timeoutMapRef.current = map;
      };

      if (type && api[type]) {
        api[type]({
          message,
          description,
          icon,
          style,
          duration,
          placement,
          btn,
          onClick,
          onClose,
          className,
          closeIcon,
          direction,
          closable,
          key,
        });

        controlTimeout();
        return;
      }

      api.open({
        message,
        description,
        icon,
        style,
        duration,
        placement,
        btn,
        onClick,
        onClose,
        className,
        closeIcon,
        direction,
        closable,
        key,
      });

      controlTimeout();

      update?.();
    },
    [api],
  );

  const closeNotification = useCallback(
    (key?: React.Key) => {
      api.destroy(key);
    },
    [api],
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

NotificationProvider.displayName = 'Notification';
