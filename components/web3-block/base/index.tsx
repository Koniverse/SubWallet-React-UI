import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';

function defaultRender(x: React.ReactNode) {
  return x;
}

export interface Web3BlockProps {
  leftItem?: React.ReactNode;
  middleItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  renderLeftItem?: (dItem: React.ReactNode) => React.ReactNode;
  renderMiddleItem?: (dItem: React.ReactNode) => React.ReactNode;
  renderRightItem?: (dItem: React.ReactNode) => React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Web3Block: React.FC<Web3BlockProps> = ({
  leftItem,
  middleItem,
  rightItem,
  onClick,
  className,
  renderLeftItem = defaultRender,
  renderMiddleItem = defaultRender,
  renderRightItem = defaultRender,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('web3-block');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <div className={`${classes} ${className}`} onClick={onClick}>
      {!!leftItem && <div className={`${prefixCls}-left-item`}>{renderLeftItem(leftItem)}</div>}
      {!!middleItem && (
        <div className={`${prefixCls}-middle-item`}>{renderMiddleItem(middleItem)}</div>
      )}
      {!!rightItem && <div className={`${prefixCls}-right-item`}>{renderRightItem(rightItem)}</div>}
    </div>,
  );
};

export default Web3Block;
