import * as React from 'react';
import classNames from 'classnames';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Divider from '../../divider';

export interface SettingItemProps {
  name: string;
  subIcon?: React.ReactNode;
  className?: string;
  onPressItem?: () => void;
  withDivider?: boolean;
  leftItemIcon?: React.ReactNode;
  rightComponent?: React.ReactNode;
  dividerPadding?: number;
}

const SettingItem: React.FC<SettingItemProps> = ({
  name,
  className,
  onPressItem,
  withDivider = false,
  leftItemIcon,
  rightComponent,
  dividerPadding = 12,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('setting-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, {
    '-with-divider': withDivider,
  });

  const getMiddleItem = () => <div className={`${prefixCls}-name`}>{name}</div>;

  return wrapSSR(
    <div className={`${classes} ${className}`}>
      <Web3Block
        className={`${prefixCls}-content`}
        leftItem={leftItemIcon}
        middleItem={getMiddleItem()}
        rightItem={rightComponent}
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

export default SettingItem;
