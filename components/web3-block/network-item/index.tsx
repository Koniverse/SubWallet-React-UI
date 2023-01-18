import * as React from 'react';
import classNames from 'classnames';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Logo from '../../logo';
import Divider from '../../divider';

export interface NetworkItemProps extends Web3BlockProps {
  name: string;
  networkMainLogoSize?: number;
  networkMainLogoShape?: 'circle' | 'squircle';
  networkSubLogoShape?: 'circle' | 'squircle';
  isShowSubLogo?: boolean;
  networkKey?: string;
  subNetworkKey?: string;
  symbol?: string;
  subSymbol?: string;
  subIcon?: React.ReactNode;
  className?: string;
  onPressItem?: () => void;
  withDivider?: boolean;
  rightComponent?: React.ReactNode;
}

const NetworkItem: React.FC<NetworkItemProps> = ({
  name,
  networkMainLogoSize = 40,
  networkMainLogoShape = 'squircle',
  networkSubLogoShape = 'circle',
  networkKey,
  subNetworkKey,
  symbol,
  subSymbol,
  isShowSubLogo,
  className,
  onPressItem,
  withDivider = false,
  leftItem,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('network-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, {
    '-with-divider': withDivider,
  });

  return wrapSSR(
    <div className={`${classes} ${className}`}>
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
        middleItem={middleItem || <div className={`${prefixCls}-name`}>{name}</div>}
        rightItem={rightItem}
        onClick={onPressItem}
      />
      {withDivider && (
        <div className={`${prefixCls}-divider`}>
          <Divider />
        </div>
      )}
    </div>,
  );
};

export default NetworkItem;
