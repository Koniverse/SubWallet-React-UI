import * as React from 'react';
import Identicon from '@polkadot/react-identicon';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigContext } from '../config-provider';

export interface SwAvatarProps {
  theme: IconTheme;
  size: number;
  value: string | null;
  prefix: number;
  isShowSubIcon: boolean;
  subIcon?: React.ReactNode;
}

const SwAvatar = ({ size, value, prefix, theme, isShowSubIcon, subIcon }: SwAvatarProps) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('sw-avatar');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);
  return wrapSSR(
    <div
      className={classes}
      style={{ padding: size * 0.1, borderWidth: size * 0.05, width: size, height: size }}
    >
      <Identicon className="icon" size={size * 0.7} value={value} prefix={prefix} theme={theme} />
      {isShowSubIcon && <div className="sub-icon">{subIcon}</div>}
    </div>,
  );
};

export default SwAvatar;
