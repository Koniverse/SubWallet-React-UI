import * as React from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { IconWeight } from 'phosphor-react/src/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProps } from 'phosphor-react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { AntIconType } from 'antd/es/icon/stories/icon.stories';

export interface SWIconProps {
  type?: 'fontAwesome' | 'phosphor' | 'antDesignIcon';
  size?: SizeType;
  customSize?: string;
  phosphorIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  fontawesomeIcon?: IconProp;
  antDesignIcon?: AntIconType;
  weight?: IconWeight;
  iconColor?: string;
  className?: string;
}

const Icon: React.FC<SWIconProps> = ({
  className,
  type = 'phosphor',
  size,
  customSize,
  phosphorIcon: PhosphorIcon,
  fontawesomeIcon,
  antDesignIcon: AntDesignIcon,
  weight,
  iconColor,
}) => {
  const getIconSize = () => {
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

  const wrapperClass = className ? `anticon ${className}` : 'anticon';

  if (type === 'fontAwesome' && fontawesomeIcon) {
    return (
      <span
        className={wrapperClass}
        style={{
          fontSize: customSize || getIconSize(),
          color: iconColor,
        }}
      >
        <FontAwesomeIcon
          icon={fontawesomeIcon}
          style={{ width: '1em', height: '1em' }}
          color="currentColor"
        />
      </span>
    );
  }

  if (type === 'phosphor' && PhosphorIcon) {
    return (
      <span
        className={wrapperClass}
        style={{
          fontSize: customSize || getIconSize(),
          color: iconColor,
        }}
      >
        <PhosphorIcon size="1em" weight={weight} color="currentColor" />
      </span>
    );
  }

  if (type === 'antDesignIcon' && AntDesignIcon) {
    return (
      <AntDesignIcon
        className={className}
        style={{
          fontSize: customSize || getIconSize(),
          color: iconColor,
        }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Icon;
