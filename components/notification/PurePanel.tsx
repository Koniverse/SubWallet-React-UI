import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import { CheckCircle, Info, WarningCircle, X, XCircle } from 'phosphor-react';
import { Notice } from 'rc-notification';
import type { NoticeProps } from 'rc-notification/lib/Notice';
import * as React from 'react';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';
import type { IconType } from './interface';
import useStyle from './style';

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
};

export function getCloseIcon(prefixCls: string, closeIcon?: React.ReactNode) {
  return (
    closeIcon || (
      <span className={`${prefixCls}-close-x`}>
        <Icon
          type="phosphor"
          phosphorIcon={X}
          className={`${prefixCls}-close-icon`}
          weight="bold"
        />
      </span>
    )
  );
}

export interface PureContentProps {
  prefixCls: string;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  type?: IconType;
  direction?: 'horizontal' | 'vertical';
  onClose?: () => void;
  closeable?: boolean;
}

const typeToIcon = {
  success: CheckCircle,
  info: Info,
  error: XCircle,
  warning: WarningCircle,
};

export function PureContent({
  prefixCls,
  icon,
  type,
  message,
  description,
  direction,
  btn,
  onClose,
  closeable,
  closeIcon = <Icon phosphorIcon={X} size="sm" />,
}: PureContentProps) {
  let iconNode: React.ReactNode = null;
  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
  } else if (type) {
    iconNode = (
      <Icon
        className={classNames(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`)}
        type="phosphor"
        phosphorIcon={typeToIcon[type]}
        weight="fill"
        size="lg"
      />
    );
  }

  return (
    <div
      className={classNames(`${prefixCls}-container`, {
        [`${prefixCls}-vertical`]: direction === 'vertical',
      })}
      role="alert"
    >
      {iconNode}
      <div className={`${prefixCls}-main-content`}>
        <div className={`${prefixCls}-message`}>{message}</div>
        {description && <div className={`${prefixCls}-description`}>{description}</div>}
        {btn && <div className={`${prefixCls}-btn`}>{btn}</div>}
      </div>
      {onClose && closeable && (
        <Button
          onClick={onClose}
          className={classNames(`${prefixCls}-close-button`)}
          size="xs"
          type="ghost"
        >
          {closeIcon}
        </Button>
      )}
    </div>
  );
}

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
    Omit<PureContentProps, 'prefixCls' | 'children'> {
  prefixCls?: string;
}

/** @private Internal Component. Do not use in your production. */
export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: staticPrefixCls,
    className,
    icon,
    type,
    message,
    description,
    btn,
    closable = false,
    closeIcon,
    direction,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  const noticePrefixCls = `${prefixCls}-notice`;

  const [, hashId] = useStyle(prefixCls);

  return (
    <Notice
      {...restProps}
      prefixCls={prefixCls}
      className={classNames(className, hashId, `${noticePrefixCls}-pure-panel`)}
      eventKey="pure"
      duration={null}
      closable={closable}
      closeIcon={getCloseIcon(prefixCls, closeIcon)}
      content={
        <PureContent
          prefixCls={noticePrefixCls}
          icon={icon}
          type={type}
          message={message}
          description={description}
          btn={btn}
          direction={direction}
        />
      }
    />
  );
}
