import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import StakingItem from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/StakingItem',
  component: StakingItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    stakingNetwork: { control: 'text', defaultValue: 'Polkadot' },
    networkKey: { control: 'text', defaultValue: 'polkadot' },
    displayToken: { control: 'text', defaultValue: 'DOT' },
    convertedStakingValue: { control: 'number', defaultValue: 4993.33 },
    stakingValue: { control: 'number', defaultValue: 600 },
    stakingType: { control: 'text', defaultValue: 'Staking Balance' },
  },
} as ComponentMeta<typeof StakingItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StakingItem> = (args) => <StakingItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
