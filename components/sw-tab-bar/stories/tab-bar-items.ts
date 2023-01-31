import { Aperture, Database, Globe, Rocket, Wallet } from 'phosphor-react';
import type { SwTabBarItem } from '..';

// eslint-disable-next-line import/prefer-default-export
export const TabBarItems: Array<Omit<SwTabBarItem, 'onClick'>> = [
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Wallet,
      weight: 'fill',
    },
    label: 'Tokens',
    key: 'token',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Aperture,
      weight: 'fill',
    },
    label: 'NFTs',
    key: 'nft',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Rocket,
      weight: 'fill',
    },
    label: 'Crowdloands',
    key: 'crowdloands',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Database,
      weight: 'fill',
    },
    label: 'Staking',
    key: 'staking',
  },
  {
    icon: {
      type: 'phosphor',
      phosphorIcon: Globe,
      weight: 'fill',
    },
    label: 'Browser',
    key: 'browser',
  },
];
