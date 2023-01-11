import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import BalanceItem from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/BalanceItem',
  component: BalanceItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text', defaultValue: 'Polkadot' },
    symbol: { control: 'text', defaultValue: 'dot' },
    displayToken: { control: 'text', defaultValue: 'DOT' },
    isShowSubLogo: { control: 'boolean', defaultValue: false },
    price: { control: 'number', defaultValue: 7.22 },
    convertedBalanceValue: { control: 'number', defaultValue: 4993.33 },
    balanceValue: { control: 'number', defaultValue: 600 },
    withDivider: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof BalanceItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BalanceItem> = (args) => <BalanceItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  subNetworkKey: 'kusama',
};
