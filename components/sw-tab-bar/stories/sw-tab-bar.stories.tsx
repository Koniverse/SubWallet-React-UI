import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Wallet, Aperture, Rocket, Database, Globe } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import SwTabBar from '../index';

export default {
  title: 'Layout/SwTabBar',
  component: SwTabBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SwTabBar>;

const Template: ComponentStory<typeof SwTabBar> = (args) => {
  const [selected, setSelected] = useState('token');
  const onSelect = useCallback(
    (key: string) => () => {
      setSelected(key);
    },
    [],
  );

  return (
    <div
      style={{ marginRight: -16, marginLeft: -16, position: 'absolute', bottom: 0, width: '100%' }}
    >
      <SwTabBar
        {...args}
        items={[
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Wallet,
            },
            label: 'Tokens',
            key: 'token',
            onClick: onSelect('token'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Aperture,
            },
            label: 'NFTs',
            key: 'nft',
            onClick: onSelect('nft'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Rocket,
            },
            label: 'Crowdloands',
            key: 'crowdloands',
            onClick: onSelect('crowdloands'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Database,
            },
            label: 'Staking',
            key: 'staking',
            onClick: onSelect('staking'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Globe,
            },
            label: 'Browser',
            key: 'browser',
            onClick: onSelect('browser'),
          },
        ]}
        selected={selected}
      />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
