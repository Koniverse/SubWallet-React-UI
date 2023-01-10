import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { QrCode } from 'phosphor-react';
import AccountItem from '..';
import Icon from '../../../icon';
import Logo from '../../../logo';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/AccountItemWithLogo',
  component: AccountItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    address: { control: 'text', defaultValue: '5HbcGs2QXVAc6Q6eoTzLYNAJWpN17AkCFRLnWDaHCiGYXvNc' },
    theme: { control: 'radio', options: ['polkadot', 'ethereum'], defaultValue: 'polkadot' },
    prefix: { control: 'number', defaultValue: 42 },
    preLength: { control: 'number', defaultValue: 9 },
    subLength: { control: 'number', defaultValue: 9 },
  },
} as ComponentMeta<typeof AccountItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccountItem> = (args) => <AccountItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  size: 40,
  rightComponent: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Logo size={24} network="polkadot" />
    </div>
  ),
};

export const WithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithIcon.args = {
  size: 40,
  rightComponent: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Logo size={24} network="polkadot" />
    </div>
  ),
  isShowSubIcon: true,
  subIcon: <Icon type="phosphor" phosphorIcon={QrCode} iconColor="#FFF" size="xs" weight="bold" />,
};
