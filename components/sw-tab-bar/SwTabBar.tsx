import classNames from 'classnames';
import React, { useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';
import useStyle from './style';
import type { SwIconProps } from '../icon';

export interface SwTabBarItem {
  label: string;
  key: string;
  onClick: () => void;
  icon: SwIconProps;
}

export interface SwTabBarProps {
  prefixCls?: string;
  className?: string;
  items: SwTabBarItem[];
  selected: string;
}

const SwTabBar: React.FC<SwTabBarProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className, items, selected } = props;

  const prefixCls = getPrefixCls('sw-tab-bar', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo(
    (): string => classNames(hashId, className, `${prefixCls}-container`),
    [hashId, className, prefixCls],
  );

  return wrapSSR(
    <div className={classNames(classNameExtend)}>
      {items.map((item) => (
        <div
          className={classNames(`${prefixCls}-item`, {
            [`${prefixCls}-item-active`]: item.key === selected,
          })}
          onClick={item.onClick}
          key={item.key}
        >
          <Icon className={classNames(`${prefixCls}-item-icon`)} {...item.icon} size="sm" />
          <span className={classNames(`${prefixCls}-item-label`)}>{item.label}</span>
        </div>
      ))}
    </div>,
  );
};

export default SwTabBar;
