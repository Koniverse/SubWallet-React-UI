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
}

export const NotificationContext = React.createContext<{
  showNotification: (notificationProps: NotificationProps) => void;
}>({ showNotification: noop });

const NotificationProvider = ({
  children,
}: NotificationProviderProps): React.ReactElement<NotificationProviderProps> => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (notificationProps: NotificationProps) => {
    const {
      message,
      description,
      icon,
      style,
      duration = 0,
      placement = 'top',
      direction,
      btn,
      onClick,
      onClose,
      className,
      closeIcon,
      type,
      update,
    } = notificationProps;
    api.destroy();
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
      });

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
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!update && update();
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

NotificationProvider.displayName = 'Notification';
