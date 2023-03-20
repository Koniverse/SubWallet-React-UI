import { decodeAddress, encodeAddress, isEthereumAddress } from '@polkadot/util-crypto';
import { useMemo } from 'react';
import * as React from 'react';
import Identicon from '@polkadot/react-identicon';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigContext } from '../config-provider';

export interface SwAvatarProps {
  theme?: IconTheme;
  size?: number;
  value: string | null;
  identPrefix?: number;
  isShowSubIcon?: boolean;
  subIcon?: React.ReactNode;
}

const SwAvatar = ({
  size = 40,
  value,
  theme = 'polkadot',
  isShowSubIcon,
  subIcon,
}: SwAvatarProps) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('sw-avatar');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  const formattedAddress = useMemo((): string | null => {
    try {
      return encodeAddress(decodeAddress(value || ''));
    } catch (e) {
      return value;
    }
  }, [value]);

  const defaultTheme = useMemo(
    (): IconTheme => (isEthereumAddress(value || '') ? 'ethereum' : 'polkadot'),
    [value],
  );

  return wrapSSR(
    <div
      className={classes}
      style={{ padding: size * 0.1, borderWidth: size * 0.05, width: size, height: size }}
    >
      <Identicon
        className="icon"
        size={size * 0.7}
        value={formattedAddress}
        prefix={42}
        theme={theme || defaultTheme}
      />
      {isShowSubIcon && <div className="sub-icon">{subIcon}</div>}
    </div>,
  );
};

export default SwAvatar;
