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
                prefix="$"
                leftColor="#4CEAAC"
                rightColor="#4CEAAC"
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
                  leftColor="#FFF"
                  rightColor="#FFF"
                  rightOpacity={0.45}
                />
                <Number
                  size={12}
                  value={balanceValue}
                  decimal={decimal}
                  suffix={displayToken}
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
