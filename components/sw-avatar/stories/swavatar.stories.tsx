import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { QrCode } from 'phosphor-react';
import SwAvatar from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/SwAvatar',
  component: SwAvatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: { control: 'number', defaultValue: 40 },
    value: { control: 'text', defaultValue: '5HbcGs2QXVAc6Q6eoTzLYNAJWpN17AkCFRLnWDaHCiGYXvNc' },
    prefix: { control: 'number', defaultValue: 42 },
    theme: { control: 'radio', options: ['polkadot', 'ethereum'], defaultValue: 'polkadot' },
    isShowSubIcon: { control: 'boolean', defaultValue: false },
    subIconType: {
      control: 'radio',
      options: ['phosphor', 'fontAwesome', 'antDesignIcon'],
      defaultValue: 'phosphor',
    },
    subIconSize: { control: 'radio', options: ['xs', 'sm', 'md'], defaultValue: 'xs' },
    iconColor: { control: 'text', defaultValue: '#FFFFFF' },
  },
} as ComponentMeta<typeof SwAvatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwAvatar> = (args) => <SwAvatar {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  phosphorIcon: QrCode,
  iconWeight: 'bold',
};
