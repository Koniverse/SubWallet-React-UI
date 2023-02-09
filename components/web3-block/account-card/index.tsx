import * as React from 'react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import { CheckCircle } from 'phosphor-react';
import { ConfigContext } from '../../config-provider';
import { toShort } from '../../_util/address';
import SwAvatar from '../../sw-avatar';
import useStyle from './style';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import Icon from '../../icon';

export interface AccountCardProps extends Web3BlockProps {
  address: string;
  accountName: string;
  avatarIdentPrefix: number;
  avatarSize?: number;
  avatarTheme?: IconTheme;
  isShowSubIcon?: boolean;
  addressPreLength?: number;
  addressSufLength?: number;
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
  subIcon,
  isSelected,
  onPressItem,
  leftItem,
  middleItem,
  rightItem,
  className,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('account-card');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(
    prefixCls,
    hashId,
    {
      '-selected': isSelected,
    },
    className,
  );

  return wrapSSR(
    <Web3Block
      {...props}
      className={classes}
      leftItem={
        leftItem || (
          <SwAvatar
            value={address}
            size={avatarSize}
            theme={avatarTheme}
            identPrefix={avatarIdentPrefix}
            isShowSubIcon={isShowSubIcon}
            subIcon={subIcon}
          />
        )
      }
      middleItem={
        middleItem || (
          <>
            <div className={`${prefixCls}-name`}>{accountName}</div>
            <div className={`${prefixCls}-address`}>
              {toShort(address || '', addressPreLength, addressSufLength)}
            </div>
          </>
        )
      }
      rightItem={
        rightItem || (
          // eslint-disable-next-line react/jsx-no-useless-fragment
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
          </>
        )
      }
      onClick={onPressItem}
    />,
  );
};

export default AccountCard;
