import * as React from 'react';
import { ConfigContext } from 'antd/es/config-provider';
import useStyle from 'antd/es/spin/style';
import classNames from 'classnames';
import type { SWIconProps } from '../icon';
import Icon from '../icon';

export interface ToastProps {
  prefixCls?: string;
  title: string;
  iconProps?: SWIconProps;
  toastType?: 'horizontal' | 'vertical';
  visible: boolean;
}

const Toast: React.FC<ToastProps> = ({
  title,
  prefixCls: customizePrefixCls,
  iconProps = {},
  toastType = 'horizontal',
  visible,
}: ToastProps) => {
  const { type, size, phosphorIcon, fontawesomeIcon, antDesignIcon, weight, iconColor } = iconProps;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('toast', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const className = classNames(prefixCls, hashId);
  return wrapSSR(
    <div
      className={`${className} ${toastType === 'vertical' && '-vertical'} ${visible && '-visible'}`}
    >
      <Icon
        type={type}
        size={size}
        phosphorIcon={phosphorIcon}
        fontawesomeIcon={fontawesomeIcon}
        antDesignIcon={antDesignIcon}
        iconColor={iconColor}
        weight={weight}
      />
      <span>{title}</span>
    </div>,
  );
};

export default Toast;
