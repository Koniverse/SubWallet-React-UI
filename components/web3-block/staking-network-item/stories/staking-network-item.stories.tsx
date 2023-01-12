import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { DotsThree } from 'phosphor-react';
import StakingNetworkItem from '..';
import Button from '../../../button';
import Icon from '../../../icon';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/StakingNetworkItem',
  component: StakingNetworkItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    stakingNetwork: { control: 'text', defaultValue: 'Polkadot' },
    expectedReturn: { control: 'number', defaultValue: 12.5 },
    networkKey: { control: 'text', defaultValue: 'polkadot' },
    stakingCount: { control: 'number', defaultValue: 9072 },
    validatorType: { control: 'text', defaultValue: 'Validators' },
  },
} as ComponentMeta<typeof StakingNetworkItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StakingNetworkItem> = (args) => (
  <StakingNetworkItem {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  rightItem: (
    <Button
      type="ghost"
      icon={
        <Icon
          type="phosphor"
          phosphorIcon={DotsThree}
          iconColor="rgba(255, 255, 255, 0.45)"
          size="sm"
        />
      }
    />
  ),
};
