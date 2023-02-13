import * as React from 'react';
import type BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { CaretRight } from 'phosphor-react';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Logo from '../../logo';
import Number from '../../number';
import Icon from '../../icon';

export interface StakingNetworkItemProps extends Web3BlockProps {
  stakingNetwork: string;
  stakingCount?: string | number | BigNumber;
  expectedReturn: string | number | BigNumber;
  networkMainLogoSize?: number;
  networkMainLogoShape?: 'circle' | 'squircle';
  networkKey?: string;
  symbol?: string;
  className?: string;
  onPressItem?: () => void;
  validatorType?: string;
}

const StakingNetworkItem: React.FC<StakingNetworkItemProps> = ({
  stakingNetwork,
  networkMainLogoSize = 40,
  networkMainLogoShape = 'squircle',
  networkKey,
  symbol,
  stakingCount,
  expectedReturn,
  className,
  onPressItem,
  validatorType,
  leftItem,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('staking-network-item');
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
            {stakingCount && (
              <span className={`${prefixCls}-staking-count`}>
                <Number
                  size={12}
                  value={stakingCount}
                  decimal={0}
                  intOpacity={0.45}
                  decimalOpacity={0.45}
                  unitOpacity={0.45}
                />
                {validatorType}
              </span>
            )}
          </>
        )
      }
      rightItem={
        rightItem || (
          <>
            {!!expectedReturn && (
              <Number
                value={expectedReturn}
                decimal={0}
                suffix="%"
                intColor="#4CEAAC"
                decimalColor="#4CEAAC"
                unitColor="#4CEAAC"
              />
            )}
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

export default StakingNetworkItem;
