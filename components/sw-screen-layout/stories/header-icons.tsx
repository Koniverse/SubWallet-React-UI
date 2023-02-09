import React from 'react';
import { FunnelSimple, Gear, MagnifyingGlass, QrCode } from 'phosphor-react';
import type { ButtonProps } from '../../button';
import Icon from '../../icon';

// eslint-disable-next-line import/prefer-default-export
export const HeaderIcons = {
  icon: <Icon type="phosphor" phosphorIcon={QrCode} size="sm" />,
  icon1: <Icon type="phosphor" phosphorIcon={FunnelSimple} size="sm" />,
  icon2: <Icon type="phosphor" phosphorIcon={MagnifyingGlass} size="sm" />,
  icon3: <Icon type="phosphor" phosphorIcon={Gear} size="sm" />,
};

export const RIGHT_ICON_TYPES = {
  max: 3,
  min: 0,
};

export const renderRightIcons = (type: number): ButtonProps[] => {
  switch (type) {
    case 3:
      return [
        {
          children: 'Button',
        },
      ];
    case 2:
      return [HeaderIcons.icon1, HeaderIcons.icon2, HeaderIcons.icon3].map((icon) => ({
        icon,
      }));
    case 1:
      return [
        {
          icon: HeaderIcons.icon,
        },
      ];
    default:
      return [];
  }
};
