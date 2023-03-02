import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Users } from 'phosphor-react';
import StakingItem from '..';
import Tag from '../../../tag';
import Icon from '../../../icon';

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
  },
} as ComponentMeta<typeof StakingItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StakingItem> = (args) => <StakingItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  stakingType: (
    <Tag
      style={{ width: 'fit-content' }}
      icon={<Icon phosphorIcon={Users} iconColor="#4cd9ac" />}
      color="success"
    >
      Nominated
    </Tag>
  ),
};
