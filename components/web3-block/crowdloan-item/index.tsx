import * as React from 'react';
import type BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Web3Block from '../base';
import Logo from '../../logo';
import Number from '../../number';

export interface CrowdloanItemProps {
  convertedBalanceValue: string | number | BigNumber;
  balanceValue: string | number | BigNumber;
  displayNetwork: string;
  paraChain: string;
  decimal: number;
  networkKey?: string;
  subNetworkKey?: string;
  symbol?: string;
  subSymbol?: string;
  networkMainLogoSize?: number;
  networkSubLogoSize?: number;
  networkMainLogoShape?: 'circle' | 'squircle';
  networkSubLogoShape?: 'circle' | 'squircle';
  isShowSubLogo?: boolean;
  crowdloanStatusTag?: React.ReactNode;
  displayToken?: string;
}

const CrowdloanItem: React.FC<CrowdloanItemProps> = ({
  displayNetwork,
  paraChain,
  networkKey,
  subNetworkKey,
  symbol,
  subSymbol,
  networkMainLogoSize = 40,
  networkSubLogoSize = 16,
  networkMainLogoShape = 'squircle',
  networkSubLogoShape = 'circle',
  isShowSubLogo,
  crowdloanStatusTag,
  balanceValue,
  convertedBalanceValue,
  decimal,
  displayToken,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('balance-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  const getLeftItem = () => (
    <Logo
      size={networkMainLogoSize}
      network={networkKey}
      token={symbol}
      shape={networkMainLogoShape}
      isShowSubLogo={isShowSubLogo}
      subLogoShape={networkSubLogoShape}
      subLogoSize={networkSubLogoSize}
      subNetwork={subNetworkKey}
      subToken={subSymbol}
    />
  );
  const getMiddleItem = () => (
    <div>
      <div className={`${prefixCls}-left-content`}>
        <div className={`${prefixCls}-name`}>{displayNetwork}</div>
        {crowdloanStatusTag}
      </div>
      <div className={`${prefixCls}-parachain`}>{paraChain}</div>
    </div>
  );
  const getRightItem = () => (
    <div className={`${prefixCls}-right-part`}>
      <Number
        value={balanceValue}
        decimal={decimal}
        leftColor="#FFF"
        rightColor="#FFF"
        suffix={displayToken}
      />
      <Number
        size={12}
        decimal={0}
        value={convertedBalanceValue}
        prefix="$"
        leftColor="#FFF"
        leftOpacity={0.45}
        rightColor="#FFF"
        rightOpacity={0.45}
      />
    </div>
  );
  return wrapSSR(
    <Web3Block
      className={classes}
      leftItem={getLeftItem()}
      middleItem={getMiddleItem()}
      rightItem={getRightItem()}
    />,
  );
};

export default CrowdloanItem;
