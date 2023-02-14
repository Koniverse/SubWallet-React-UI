import * as React from 'react';
import type BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import Logo from '../../logo';
import Number from '../../number';

export interface CrowdloanItemProps extends Web3BlockProps {
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
  networkMainLogoShape = 'squircle',
  networkSubLogoShape = 'circle',
  isShowSubLogo,
  crowdloanStatusTag,
  balanceValue,
  convertedBalanceValue,
  decimal,
  displayToken,
  leftItem,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('crowdloan-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <Web3Block
      {...props}
      className={classes}
      leftItem={
        leftItem || (
          <Logo
            size={networkMainLogoSize}
            network={networkKey}
            token={symbol}
            shape={networkMainLogoShape}
            isShowSubLogo={isShowSubLogo}
            subLogoShape={networkSubLogoShape}
            subNetwork={subNetworkKey}
            subToken={subSymbol}
          />
        )
      }
      middleItem={
        middleItem || (
          <div>
            <div className={`${prefixCls}-left-content`}>
              <div className={`${prefixCls}-name`}>{displayNetwork}</div>
              {crowdloanStatusTag}
            </div>
            <div className={`${prefixCls}-parachain`}>{paraChain}</div>
          </div>
        )
      }
      rightItem={
        rightItem || (
          <div className={`${prefixCls}-right-part`}>
            <Number
              value={balanceValue}
              decimal={decimal}
              decimalOpacity={0.45}
              suffix={displayToken}
            />
            <Number
              size={12}
              decimal={0}
              value={convertedBalanceValue}
              prefix="$"
              intOpacity={0.45}
              decimalOpacity={0.45}
              unitOpacity={0.45}
            />
          </div>
        )
      }
    />,
  );
};

export default CrowdloanItem;
