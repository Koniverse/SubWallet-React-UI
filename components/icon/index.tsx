import * as React from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { IconWeight } from 'phosphor-react/src/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProps } from 'phosphor-react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { AntIconType } from 'antd/es/icon/stories/icon.stories';

interface SwIconProps {
  type: string;
  size?: SizeType;
  phosphorIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  fontawesomeIcon?: IconProp;
  antDesignIcon?: AntIconType;
  weight?: IconWeight;
  iconColor?: string;
}

const Icon: React.FC<SwIconProps> = ({
  type,
  size,
  phosphorIcon: PhosphorIcon,
  fontawesomeIcon,
  antDesignIcon: AntDesignIcon,
  weight,
  iconColor,
}) => {
  const getIconSize = () => {
    if (size === 'xs') {
      return '12px';
    }
    if (size === 'sm') {
      return '16px';
    }

    return '24px';
  };

  const getAntIconSize = () => {
    if (!size) {
      return undefined;
    }

    if (size === 'xs') {
      return 16;
    }
    if (size === 'sm') {
      return 24;
    }

    return 32;
  };

  if (type === 'fontAwesome' && fontawesomeIcon) {
    return (
      <FontAwesomeIcon
        icon={fontawesomeIcon}
        style={{ width: getIconSize(), height: getIconSize() }}
        color={iconColor}
      />
    );
  }

  if (type === 'phosphor' && PhosphorIcon) {
    return <PhosphorIcon size={getIconSize()} weight={weight} color={iconColor} />;
  }

  if (type === 'antDesignIcon' && AntDesignIcon) {
    return (
      <AntDesignIcon
        style={{
          fontSize: getAntIconSize(),
          color: iconColor,
          width: getAntIconSize(),
          height: getAntIconSize(),
        }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Icon;
