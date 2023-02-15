import classNames from 'classnames';
import React from 'react';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import type { SwIconProps } from '../icon';
import Icon from '../icon';

export interface PageIconProps {
  color: string;
  iconProps: Omit<SwIconProps, 'iconColor' | 'size' | 'customSize'>;
}

const PageIcon: React.FC<PageIconProps> = ({ color, iconProps }: PageIconProps) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('page-icon');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div
      className={classNames(hashId, prefixCls)}
      // @ts-ignore
      style={{ '--color': color }}
    >
      <Icon {...iconProps} iconColor={color} customSize='40px' />
    </div>,
  );
};

export default PageIcon;
