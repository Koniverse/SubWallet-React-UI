import * as React from 'react';
import classNames from 'classnames';
import type { SwIconProps } from '../icon';
import Icon from "../icon";
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { ImageShape } from '../image';
import Squircle from '../squircle';

export interface BackgroundIconProps extends Omit<SwIconProps, 'customSize'>{
  shape?: ImageShape;
  backgroundColor?: string;
}

const BackgroundIcon: React.FC<BackgroundIconProps> = ({
  size,
  shape = 'circle',
  backgroundColor = '#004BFF',
  ...iconProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('background-icon');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, {
    [`-shape-${shape}`]: shape !== 'default' && shape,
  });

  const getBackgroundIconSize = () => {
    if (!size) {
      return {
        wrapperSize: undefined,
        iconSize: undefined,
      };
    }

    if (size === 'xs') {
      return {
        wrapperSize: 16,
        iconSize: '12px',
      };
    }
    if (size === 'sm') {
      return {
        wrapperSize: 24,
        iconSize: '16px',
      };
    }

    return {
      wrapperSize: 32,
      iconSize: '24px',
    };
  };
  const { wrapperSize, iconSize } = getBackgroundIconSize();

  if (shape === 'squircle') {
    return (
      <Squircle customSize={wrapperSize} fill={backgroundColor}>
        <Icon
          {...iconProps}
          customSize={iconSize}
        />
      </Squircle>
    );
  }

  return wrapSSR(
    <div className={classes} style={{ width: wrapperSize, height: wrapperSize, backgroundColor }}>
      <Icon
        {...iconProps}
        customSize={iconSize}
      />
    </div>,
  );
};

export default BackgroundIcon;
