import { decodeAddress, encodeAddress, isEthereumAddress } from '@polkadot/util-crypto';
import { useCallback, useContext, useMemo } from 'react';
import * as React from 'react';
import Identicon from '@polkadot/react-identicon';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import { NotificationContext } from '../notification/NotificationProvider';

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
  theme,
  isShowSubIcon,
  subIcon,
  identPrefix,
}: SwAvatarProps) => {
  const { showNotification } = useContext(NotificationContext);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('sw-avatar');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  const formattedAddress = useMemo((): string | null => {
    try {
      return encodeAddress(decodeAddress(value || ''), identPrefix);
    } catch (e) {
      return value;
    }
  }, [value, identPrefix]);

  const defaultTheme = useMemo(
    (): IconTheme => (isEthereumAddress(value || '') ? 'ethereum' : 'polkadot'),
    [value],
  );

  const onCopy = useCallback(
    (address: string) => {
      showNotification({
        key: address,
        closable: false,
        duration: 1.5,
        message: 'Copied address',
        placement: 'top',
      });
    },
    [showNotification],
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
        prefix={identPrefix}
        theme={theme || defaultTheme}
        onCopy={onCopy}
      />
      {isShowSubIcon && <div className="sub-icon">{subIcon}</div>}
    </div>,
  );
};

export default SwAvatar;
