import * as React from 'react';
import type BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { CaretRight } from 'phosphor-react';
import Number from '../../number';
import Logo from '../../logo';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Icon from '../../icon';

export interface StakingItemProps extends Web3BlockProps {
  stakingNetwork: string;
  stakingType?: string;
  convertedStakingValue: string | number | BigNumber;
  stakingValue: string | number | BigNumber;
  decimal: number;
  networkMainLogoSize?: number;
  networkMainLogoShape?: 'circle' | 'squircle';
  networkKey?: string;
  symbol?: string;
  displayToken?: string;
  className?: string;
  onPressItem?: () => void;
}

const StakingItem: React.FC<StakingItemProps> = ({
  stakingNetwork,
  networkMainLogoSize = 40,
  networkMainLogoShape = 'squircle',
  convertedStakingValue,
  stakingValue,
  decimal,
  stakingType,
  networkKey,
  symbol,
  displayToken,
  className,
  onPressItem,
  leftItem,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('staking-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <Web3Block
      {...props}
      className={`${classes} ${className}`}
      leftItem={
        leftItem || (
          <Logo
            size={networkMainLogoSize}
            network={networkKey}
            token={symbol}
            shape={networkMainLogoShape}
            isShowSubLogo={false}
          />
        )
      }
      middleItem={
        middleItem || (
          <>
            <div className={`${prefixCls}-name`}>{stakingNetwork}</div>
            {stakingType && <div className={`${prefixCls}-staking-type`}>{stakingType}</div>}
          </>
        )
      }
      rightItem={
        rightItem || (
          <>
            <div className={`${prefixCls}-balance-info-wrapper`}>
              <Number
                value={stakingValue}
                decimal={decimal}
                suffix={displayToken}
                decimalOpacity={0.45}
              />
              <Number
                size={12}
                prefix="$"
                value={convertedStakingValue}
                decimal={0}
                intOpacity={0.45}
                decimalOpacity={0.45}
                unitOpacity={0.45}
              />
            </div>
            <Icon
              className={`${prefixCls}-right-icon`}
              type="phosphor"
              phosphorIcon={CaretRight}
              size="sm"
            />
          </>
        )
      }
      onClick={onPressItem}
    />,
  );
};

export default StakingItem;
