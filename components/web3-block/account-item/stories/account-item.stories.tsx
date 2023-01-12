import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Copy, QrCode } from 'phosphor-react';
import AccountItem from '..';
import Icon from '../../../icon';
import Button from '../../../button';
import Logo from '../../../logo';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/AccountItem',
  component: AccountItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    address: { control: 'text', defaultValue: '5HbcGs2QXVAc6Q6eoTzLYNAJWpN17AkCFRLnWDaHCiGYXvNc' },
    avatarSize: { control: 'number', defaultValue: 40 },
    avatarTheme: { control: 'radio', options: ['polkadot', 'ethereum'], defaultValue: 'polkadot' },
    avatarIdentPrefix: { control: 'number', defaultValue: 42 },
    addressPreLength: { control: 'number', defaultValue: 9 },
    addressSufLength: { control: 'number', defaultValue: 9 },
    isSelected: { control: 'boolean', defaultValue: false },
    isShowSubIcon: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof AccountItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccountItem> = (args) => <AccountItem {...args} />;

export const Selection = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Selection.args = {
  subIcon: <Icon type="phosphor" phosphorIcon={QrCode} iconColor="#FFF" size="xs" weight="bold" />,
  rightComponent: (
    <Button
      type="ghost"
      size="xs"
      icon={
        <Icon type="phosphor" phosphorIcon={Copy} iconColor="rgba(255, 255, 255, 0.45)" size="sm" />
      }
    />
  ),
};

export const WithChain = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithChain.args = {
  rightComponent: (
    <div style={{ paddingRight: 8 }}>
      <Logo size={24} network="polkadot" />
    </div>
  ),
  subIcon: <Icon type="phosphor" phosphorIcon={QrCode} iconColor="#FFF" size="xs" weight="bold" />,
};
