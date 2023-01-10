import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { QrCode } from 'phosphor-react';
import AccountCard from '..';
import Icon from '../../../icon';

const { AccountCardToggle } = AccountCard;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/AccountCardToggle',
  component: AccountCardToggle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    address: { control: 'text', defaultValue: '5HbcGs2QXVAc6Q6eoTzLYNAJWpN17AkCFRLnWDaHCiGYXvNc' },
    accountName: { control: 'text', defaultValue: 'Account 5' },
    theme: { control: 'radio', options: ['polkadot', 'ethereum'], defaultValue: 'polkadot' },
    prefix: { control: 'number', defaultValue: 42 },
    preLength: { control: 'number', defaultValue: 9 },
    subLength: { control: 'number', defaultValue: 9 },
  },
} as ComponentMeta<typeof AccountCardToggle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccountCardToggle> = (args) => (
  <AccountCardToggle {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const WithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithIcon.args = {
  isShowSubIcon: true,
  subIcon: <Icon type="phosphor" phosphorIcon={QrCode} iconColor="#FFF" size="xs" weight="bold" />,
};
