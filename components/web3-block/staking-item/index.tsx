import * as React from 'react';
import type BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { CaretRight } from 'phosphor-react';
import Number from '../../number';
import Logo from '../../logo';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Icon from '../../icon';

export interface StakingItemProps {
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
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('staking-item');
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
      {stakingType && <div className={`${prefixCls}-staking-type`}>{stakingType}</div>}
    </>
  );

  const getRightItem = () => (
    <>
      <div className={`${prefixCls}-balance-info-wrapper`}>
        <Number
          value={stakingValue}
          decimal={decimal}
          suffix={displayToken}
          leftColor="#FFF"
          rightColor="#FFF"
        />
        <Number
          size={12}
          prefix="$"
          value={convertedStakingValue}
          decimal={0}
          leftColor="#FFF"
          leftOpacity={0.45}
          rightColor="#FFF"
          rightOpacity={0.45}
        />
      </div>
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

export default StakingItem;
