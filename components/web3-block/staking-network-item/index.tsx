import * as React from 'react';
import type BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { CaretRight } from 'phosphor-react';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Logo from '../../logo';
import Number from '../../number';
import Icon from '../../icon';

export interface StakingNetworkItemProps {
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
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('staking-network-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);
  const getLeftItem = () => (
    <Logo
      size={networkMainLogoSize}
      network={networkKey}
      token={symbol}
      shape={networkMainLogoShape}
      isShowSubLogo={false}
    />
  );

  const getMiddleItem = () => (
    <>
      <div className={`${prefixCls}-name`}>{stakingNetwork}</div>
      {stakingCount && (
        <span className={`${prefixCls}-staking-count`}>
          <Number
            size={12}
            value={stakingCount}
            decimal={0}
            leftColor="#FFF"
            leftOpacity={0.45}
            rightColor="#FFF"
            rightOpacity={0.45}
          />
          {validatorType}
        </span>
      )}
    </>
  );

  const getRightItem = () => (
    <>
      <Number
        value={expectedReturn}
        decimal={0}
        suffix="%"
        leftColor="#4CEAAC"
        rightColor="#4CEAAC"
      />
      <Icon
        className={`${prefixCls}-right-icon`}
        type="phosphor"
        phosphorIcon={CaretRight}
        size="xs"
      />
    </>
  );

  return wrapSSR(
    <Web3Block
      className={`${classes} ${className}`}
      leftItem={getLeftItem()}
      middleItem={getMiddleItem()}
      rightItem={getRightItem()}
      onClick={onPressItem}
    />,
  );
};

export default StakingNetworkItem;
