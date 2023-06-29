import type AntIcon from '@ant-design/icons/es';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames";
import type { IconProps } from 'phosphor-react';
import type { IconWeight } from 'phosphor-react/src/lib';
import * as React from 'react';
import { CSSProperties,useMemo } from "react";
import type { SizeType } from '../config-provider/SizeContext';

export type AntIconType = typeof AntIcon;

export interface SwIconProps {
  type?: 'fontAwesome' | 'phosphor' | 'antDesignIcon' | 'customIcon';
  size?: SizeType;
  customSize?: string;
  phosphorIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  fontawesomeIcon?: IconProp;
  antDesignIcon?: AntIconType;
  customIcon?: React.ReactNode;
  weight?: IconWeight;
  iconColor?: string;
  className?: string;
}

const Icon: React.FC<SwIconProps> = ({
  className,
  type = 'phosphor',
  size,
  customSize,
  phosphorIcon: PhosphorIcon,
  fontawesomeIcon,
  antDesignIcon: AntDesignIcon,
  customIcon,
  weight,
  iconColor,
}) => {
  const iconSize = useMemo(() => {
    if (!size) {
      return undefined;
    }

    if (size === 'xs') {
      return 16;
    }
    if (size === 'sm') {
      return 20;
    }

    if (size === 'md') {
      return 24;
    }

    return 32;
  }, [size]);

  const wrapperClass = classNames('anticon', className);

  const customStyles = useMemo((): CSSProperties => {
    const size = customSize || iconSize;
    const result: CSSProperties =  {
      fontSize: size,
      color: iconColor,
    }

    if (type === 'customIcon') {
      result.width = size;
      result.height = size;
      result.justifyContent = 'center';
    }

    return result;
  }, [iconColor, customSize, iconSize, type]);

  if (type === 'fontAwesome' && fontawesomeIcon) {
    return (
      <span
        className={wrapperClass}
        style={customStyles}
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
        style={customStyles}
      >
        <PhosphorIcon size="1em" weight={weight} color="currentColor" />
      </span>
    );
  }

  if (type === 'antDesignIcon' && AntDesignIcon) {
    return (
      <AntDesignIcon
        className={className}
        style={customStyles}
      />
    );
  }


  if (type === 'customIcon' && customIcon) {
    return (
      <span
        className={wrapperClass}
        style={customStyles}
      >
        {customIcon}
      </span>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Icon;
