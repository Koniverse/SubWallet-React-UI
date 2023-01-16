import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import CrowdloanItem from '..';
import Tag from '../../../tag';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/CrowdloanItem',
  component: CrowdloanItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    balanceValue: { control: 'number', defaultValue: 600 },
    convertedBalanceValue: { control: 'number', defaultValue: 4993.33 },
    displayToken: { control: 'text', defaultValue: 'DOT' },
    displayNetwork: { control: 'text', defaultValue: 'Polkadot' },
    paraChain: { control: 'text', defaultValue: 'Polkadot Parachain' },
    symbol: { control: 'text', defaultValue: 'dot' },
    isShowSubLogo: { control: 'boolean', defaultValue: true },
  },
} as ComponentMeta<typeof CrowdloanItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CrowdloanItem> = (args) => <CrowdloanItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  subNetworkKey: 'kusama',
  crowdloanStatusTag: <Tag color="secondary">Winner</Tag>,
};
