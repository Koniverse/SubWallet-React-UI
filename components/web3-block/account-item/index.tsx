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
import { useToken } from '../../theme/internal';

export interface AccountItemProps extends Web3BlockProps {
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
  leftItem,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('account-item');
  const [, token] = useToken();
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, {
    '-selected': isSelected,
  });

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
          <div className={`${prefixCls}-address`}>
            {toShort(address || '', addressPreLength, addressSufLength)}
          </div>
        )
      }
      rightItem={
        rightItem || (
          <>
            {isSelected && (
              <div className={`${prefixCls}-icon`}>
                <Icon
                  type="phosphor"
                  phosphorIcon={CheckCircle}
                  size="sm"
                  iconColor={token.colorSecondary}
                  weight="fill"
                />
              </div>
            )}
            {rightComponent}
          </>
        )
      }
      onClick={onPressItem}
    />,
  );
};

export default AccountItem;
