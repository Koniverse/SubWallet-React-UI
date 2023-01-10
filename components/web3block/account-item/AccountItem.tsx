import * as React from 'react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import { toShort } from '../../_util/address';
import SwAvatar from '../../sw-avatar';
import useStyle from './style';

export interface AccountItemProps {
  address: string;
  size: number;
  theme: IconTheme;
  prefix: number;
  isShowSubIcon: boolean;
  preLength?: number;
  subLength?: number;
  rightComponent?: React.ReactNode;
  subIcon?: React.ReactNode;
  isSelected?: boolean;
  onPressItem?: () => void;
}

const AccountItem: React.FC<AccountItemProps> = ({
  address,
  size,
  theme,
  prefix,
  isShowSubIcon,
  preLength,
  subLength,
  rightComponent,
  subIcon,
  isSelected,
  onPressItem,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('account-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, {
    '-selected': isSelected,
  });
  return wrapSSR(
    <div className={classes} onClick={onPressItem}>
      <SwAvatar
        value={address}
        size={size}
        theme={theme}
        prefix={prefix}
        isShowSubIcon={isShowSubIcon}
        subIcon={subIcon}
      />
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-address`}>{toShort(address || '', preLength, subLength)}</div>
      </div>
      {rightComponent}
    </div>,
  );
};

export default AccountItem;
