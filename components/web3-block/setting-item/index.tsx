import * as React from 'react';
import classNames from 'classnames';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Divider from '../../divider';

export interface SettingItemProps extends Web3BlockProps {
  name: string;
  subIcon?: React.ReactNode;
  onPressItem?: () => void;
  withDivider?: boolean;
  leftItemIcon?: React.ReactNode;
  dividerPadding?: number;
}

const SettingItem: React.FC<SettingItemProps> = ({
  name,
  className,
  onPressItem,
  withDivider = false,
  leftItemIcon,
  dividerPadding = 12,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('setting-item');
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
        leftItem={leftItemIcon}
        middleItem={middleItem || <div className={`${prefixCls}-name`}>{name}</div>}
        rightItem={rightItem}
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
