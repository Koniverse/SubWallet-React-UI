import * as React from 'react';
import type { IconWeight } from 'phosphor-react/src/lib';
import type { IconProps } from 'phosphor-react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import type { SizeType } from '../config-provider/SizeContext';
import type { AntIconType } from '../icon/stories/icon.stories';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { ImageShape } from '../image';
import Squircle from '../squircle';

export interface BackgroundIconProps {
  shape?: ImageShape;
  type?: 'fontAwesome' | 'phosphor' | 'antDesignIcon';
  size?: SizeType;
  phosphorIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  fontawesomeIcon?: IconProp;
  antDesignIcon?: AntIconType;
  weight?: IconWeight;
  iconColor?: string;
  className?: string;
  backgroundColor?: string;
}

const BackgroundIcon: React.FC<BackgroundIconProps> = ({
  size,
  type,
  phosphorIcon,
  fontawesomeIcon,
  antDesignIcon,
  weight,
  iconColor,
  shape = 'circle',
  backgroundColor = '#004BFF',
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
          type={type}
          phosphorIcon={phosphorIcon}
          fontawesomeIcon={fontawesomeIcon}
          antDesignIcon={antDesignIcon}
          weight={weight}
          iconColor={iconColor}
          customSize={iconSize}
        />
      </Squircle>
    );
  }

  return wrapSSR(
    <div className={classes} style={{ width: wrapperSize, height: wrapperSize, backgroundColor }}>
      <Icon
        type={type}
        phosphorIcon={phosphorIcon}
        fontawesomeIcon={fontawesomeIcon}
        antDesignIcon={antDesignIcon}
        weight={weight}
        iconColor={iconColor}
        customSize={iconSize}
      />
    </div>,
  );
};

export default BackgroundIcon;
