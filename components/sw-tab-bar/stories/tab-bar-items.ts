import type { SwTabBarItem } from 'antd/es/sw-tab-bar';
import { Aperture, Database, Globe, Rocket, Wallet } from 'phosphor-react';

// eslint-disable-next-line import/prefer-default-export
export const TabBarItems: Array<Omit<SwTabBarItem, 'onClick'>> = [
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Wallet,
    },
    label: 'Tokens',
    key: 'token',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Aperture,
    },
    label: 'NFTs',
    key: 'nft',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Rocket,
    },
    label: 'Crowdloands',
    key: 'crowdloands',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Database,
    },
    label: 'Staking',
    key: 'staking',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Globe,
    },
    label: 'Browser',
    key: 'browser',
  },
];
