import * as React from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { IconWeight } from 'phosphor-react/src/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProps } from 'phosphor-react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { AntIconType } from 'antd/es/icon/stories/icon.stories';

interface SwIconProps {
  type: 'fontAwesome' | 'phosphor' | 'antDesignIcon';
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
    if (!size) {
      return undefined;
    }

    if (size === 'xs') {
      return 12;
    }
    if (size === 'sm') {
      return 16;
    }

    return 24;
  };

  if (type === 'fontAwesome' && fontawesomeIcon) {
    return (
      <span
        className='anticon'
        style={{
          fontSize: getIconSize(),
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
        className='anticon'
        style={{
          fontSize: getIconSize(),
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
        style={{
          fontSize: getIconSize(),
          color: iconColor,
        }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Icon;
