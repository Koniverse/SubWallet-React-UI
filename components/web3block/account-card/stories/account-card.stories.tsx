import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Copy, DotsThree, QrCode } from 'phosphor-react';
import AccountCard from '..';
import Icon from '../../../icon';
import Button from '../../../button';
import Switch from '../../../switch';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Component/AccountCard',
  component: AccountCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    address: { control: 'text', defaultValue: '5HbcGs2QXVAc6Q6eoTzLYNAJWpN17AkCFRLnWDaHCiGYXvNc' },
    size: { control: 'number', defaultValue: 40 },
    theme: { control: 'radio', options: ['polkadot', 'ethereum'], defaultValue: 'polkadot' },
    prefix: { control: 'number', defaultValue: 42 },
    accountName: { control: 'text', defaultValue: 'Account 5' },
    preLength: { control: 'number', defaultValue: 9 },
    subLength: { control: 'number', defaultValue: 9 },
    isSelected: { control: 'boolean', defaultValue: false },
    isShowSubIcon: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof AccountCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccountCard> = (args) => <AccountCard {...args} />;

export const Selection = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Selection.args = {
  subIcon: <Icon type="phosphor" phosphorIcon={QrCode} iconColor="#FFF" size="xs" weight="bold" />,
  rightComponent: (
    <div>
      <Button
        type="ghost"
        size="xs"
        icon={
          <Icon
            type="phosphor"
            phosphorIcon={Copy}
            iconColor="rgba(255, 255, 255, 0.45)"
            size="sm"
          />
        }
      />
      <Button
        type="ghost"
        size="xs"
        icon={
          <Icon
            type="phosphor"
            phosphorIcon={DotsThree}
            iconColor="rgba(255, 255, 255, 0.45)"
            size="sm"
          />
        }
      />
    </div>
  ),
};

export const Toggle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Toggle.args = {
  subIcon: <Icon type="phosphor" phosphorIcon={QrCode} iconColor="#FFF" size="xs" weight="bold" />,
  rightComponent: <Switch style={{ marginRight: 8 }} />,
};
