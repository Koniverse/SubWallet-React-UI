import * as React from 'react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import { CheckCircle } from 'phosphor-react';
import { ConfigContext } from '../../config-provider';
import { toShort } from '../../_util/address';
import SwAvatar from '../../sw-avatar';
import useStyle from './style';
import Web3Block from '../base';
import Icon from '../../icon';

export interface AccountCardProps {
  address: string;
  accountName: string;
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

const AccountCard: React.FC<AccountCardProps> = ({
  address,
  avatarSize,
  avatarTheme,
  avatarIdentPrefix,
  isShowSubIcon,
  accountName,
  addressPreLength,
  addressSufLength,
  rightComponent,
  subIcon,
  isSelected,
  onPressItem,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('account-card');
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
    <>
      <div className={`${prefixCls}-name`}>{accountName}</div>
      <div className={`${prefixCls}-address`}>
        {toShort(address || '', addressPreLength, addressSufLength)}
      </div>
    </>
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

export default AccountCard;
