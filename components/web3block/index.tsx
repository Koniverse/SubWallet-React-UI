import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface Web3BlockProps {
  leftItem: React.ReactNode;
  middleItem: React.ReactNode;
  rightItem: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Web3Block: React.FC<Web3BlockProps> = ({
  leftItem,
  middleItem,
  rightItem,
  onClick,
  className,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('web-3-block');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <div className={`${classes} ${className}`} onClick={onClick}>
      <div className={`${prefixCls}-left-item`}>{leftItem}</div>
      <div className={`${prefixCls}-middle-item`}>{middleItem}</div>
      <div className={`${prefixCls}-right-item`}>{rightItem}</div>
    </div>,
  );
};

export default Web3Block;
