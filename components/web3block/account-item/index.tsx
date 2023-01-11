import * as React from 'react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import { CheckCircle } from 'phosphor-react';
import { ConfigContext } from '../../config-provider';
import { toShort } from '../../_util/address';
import SwAvatar from '../../sw-avatar';
import useStyle from './style';
import Web3Block from '..';
import Icon from '../../icon';

export interface AccountItemProps {
  address: string;
  avatarIdentPrefix: number;
  avatarSize?: number;
  avatarTheme?: IconTheme;
  isShowSubIcon?: boolean;
  addressPreLength?: number;
  addressSufLength?: number;
  rightComponent?: React.ReactNode;
  subIcon?: React.ReactNode;
  isSelected?: boolean;
  onPressItem?: () => void;
}

const AccountItem: React.FC<AccountItemProps> = ({
  address,
  avatarSize,
  avatarTheme,
  avatarIdentPrefix,
  isShowSubIcon,
  addressPreLength,
  addressSufLength,
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

  const getLeftItem = () => (
    <SwAvatar
      value={address}
      size={avatarSize}
      theme={avatarTheme}
      identPrefix={avatarIdentPrefix}
      isShowSubIcon={isShowSubIcon}
      subIcon={subIcon}
    />
  );

  const getMiddleItem = () => (
    <div className={`${prefixCls}-address`}>
      {toShort(address || '', addressPreLength, addressSufLength)}
    </div>
  );

  const getRightItem = () => (
    <>
      {isSelected && (
        <div className={`${prefixCls}-icon`}>
          <Icon
            type="phosphor"
            phosphorIcon={CheckCircle}
            size="sm"
            iconColor="#4CEAAC"
            weight="fill"
          />
        </div>
      )}
      {rightComponent}
    </>
  );

  return wrapSSR(
    <Web3Block
      className={classes}
      leftItem={getLeftItem()}
      middleItem={getMiddleItem()}
      rightItem={getRightItem()}
      onClick={onPressItem}
    />,
  );
};

export default AccountItem;
