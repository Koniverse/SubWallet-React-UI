import * as React from 'react';
import classNames from 'classnames';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Logo from '../../logo';
import Divider from '../../divider';

export interface NetworkItemProps {
  name: string;
  networkMainLogoSize?: number;
  networkSubLogoSize?: number;
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
  networkSubLogoSize = 16,
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
  rightComponent,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('network-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, {
    '-with-divider': withDivider,
  });
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

  const getMiddleItem = () => <div className={`${prefixCls}-name`}>{name}</div>;

  return wrapSSR(
    <div className={`${classes} ${className}`}>
      <Web3Block
        className={`${prefixCls}-content`}
        leftItem={getLeftItem()}
        middleItem={getMiddleItem()}
        rightItem={rightComponent}
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
