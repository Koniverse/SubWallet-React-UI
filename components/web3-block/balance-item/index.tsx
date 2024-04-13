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
import Divider from '../../divider';

export interface BalanceItemProps extends Web3BlockProps {
  name: string;
  price: string | number | BigNumber;
  convertedBalanceValue: string | number | BigNumber;
  balanceValue: string | number | BigNumber;
  decimal: number;
  networkMainLogoSize?: number;
  networkMainLogoShape?: 'circle' | 'squircle';
  networkSubLogoShape?: 'circle' | 'squircle';
  isShowSubLogo?: boolean;
  prefix?: string;
  suffix?: string;
  networkKey?: string;
  subNetworkKey?: string;
  symbol?: string;
  subSymbol?: string;
  subIcon?: React.ReactNode;
  displayToken?: string;
  className?: string;
  onPressItem?: () => void;
  withDivider?: boolean;
  dividerPadding?: number;
}

const BalanceItem: React.FC<BalanceItemProps> = ({
  name,
  networkMainLogoSize = 40,
  networkMainLogoShape = 'squircle',
  networkSubLogoShape = 'circle',
  convertedBalanceValue,
  balanceValue,
  decimal,
  price,
  networkKey,
  subNetworkKey,
  symbol,
  subSymbol,
  isShowSubLogo,
  displayToken,
  className,
  onPressItem,
  withDivider = false,
  dividerPadding = 12,
  leftItem,
  middleItem,
  rightItem,
  prefix,
  suffix,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('balance-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(
    prefixCls,
    hashId,
    {
      '-with-divider': withDivider,
    },
    className,
  );

  return wrapSSR(
    <div className={classes}>
      <Web3Block
        {...props}
        className={`${prefixCls}-content`}
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
            <>
              <div className={`${prefixCls}-name`}>{name}</div>
              <Number
                size={12}
                value={price}
                decimal={0}
                prefix={prefix}
                suffix={suffix}
                intColor="#4CEAAC"
                decimalColor="#4CEAAC"
                unitColor="#4CEAAC"
              />
            </>
          )
        }
        rightItem={
          rightItem || (
            <>
              <div className={`${prefixCls}-balance-info-wrapper`}>
                <Number
                  value={convertedBalanceValue}
                  decimal={0}
                  prefix="$"
                  decimalOpacity={0.45}
                />
                <Number
                  size={12}
                  value={balanceValue}
                  decimal={decimal}
                  suffix={displayToken}
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
      />
      {withDivider && (
        <div style={{ paddingLeft: dividerPadding }} className={`${prefixCls}-divider`}>
          <Divider />
        </div>
      )}
    </div>,
  );
};

export default BalanceItem;
