import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { QrCode } from 'phosphor-react';
import SwAvatar from '..';
import Icon from '../../icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/SwAvatar',
  component: SwAvatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: { control: 'number', defaultValue: 120 },
    value: { control: 'text', defaultValue: '5HbcGs2QXVAc6Q6eoTzLYNAJWpN17AkCFRLnWDaHCiGYXvNc' },
    identPrefix: { control: 'number', defaultValue: 42 },
    theme: { control: 'radio', options: ['polkadot', 'ethereum'], defaultValue: 'polkadot' },
    isShowSubIcon: { control: 'boolean', defaultValue: true },
    isAllAccount: { control: 'boolean', defaultValue: false },
    allAccountName: { control: 'text', defaultValue: 'All Account Name' },
    allAccountVariant: {
      control: 'radio',
      options: ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'],
      defaultValue: 'marble',
    },
    allAccountImg: { control: 'text', defaultValue: 'https://via.placeholder.com/40/004BFF' },
  },
} as ComponentMeta<typeof SwAvatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwAvatar> = (args) => <SwAvatar {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  subIcon: <Icon type="phosphor" phosphorIcon={QrCode} iconColor="#FFF" size="xs" weight="bold" />,
};