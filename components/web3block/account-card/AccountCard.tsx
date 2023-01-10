import * as React from 'react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import { toShort } from '../../_util/address';
import SwAvatar from '../../sw-avatar';
import useStyle from './style';

export interface AccountCardProps {
  address: string;
  size: number;
  accountName: string;
  theme: IconTheme;
  prefix: number;
  isShowSubIcon: boolean;
  preLength?: number;
  subLength?: number;
  rightComponent?: React.ReactNode;
  subIcon?: React.ReactNode;
  isSelected?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({
  address,
  size,
  theme,
  prefix,
  isShowSubIcon,
  accountName,
  preLength,
  subLength,
  rightComponent,
  subIcon,
  isSelected,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('account-card');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, {
    '-selected': isSelected,
  });
  return wrapSSR(
    <div className={classes}>
      <SwAvatar
        value={address}
        size={size}
        theme={theme}
        prefix={prefix}
        isShowSubIcon={isShowSubIcon}
        subIcon={subIcon}
      />
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-name`}>{accountName}</div>
        <div className={`${prefixCls}-address`}>{toShort(address || '', preLength, subLength)}</div>
      </div>
      {rightComponent}
    </div>,
  );
};

export default AccountCard;
