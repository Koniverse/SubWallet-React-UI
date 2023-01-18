import React from 'react';
import { FunnelSimple, Gear, MagnifyingGlass, QrCode } from 'phosphor-react';
import Icon from '../../icon';

// eslint-disable-next-line import/prefer-default-export
export const HeaderIcons = {
  icon: <Icon type="phosphor" phosphorIcon={QrCode} size="sm" />,
  icon1: <Icon type="phosphor" phosphorIcon={FunnelSimple} size="sm" />,
  icon2: <Icon type="phosphor" phosphorIcon={MagnifyingGlass} size="sm" />,
  icon3: <Icon type="phosphor" phosphorIcon={Gear} size="sm" />,
};
