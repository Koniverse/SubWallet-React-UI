import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Logo from '..';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Logo',
  component: Logo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: { control: 'number', defaultValue: 40 },
    shape: {
      control: 'radio',
      options: ['circle', 'squircle'],
      defaultValue: 'circle',
    },
    isShowSubLogo: { control: 'boolean', defaultValue: false },
    subLogoShape: {
      control: 'radio',
      options: ['circle', 'squircle'],
      defaultValue: 'circle',
      if: { arg: 'isShowSubLogo', truthy: true },
    },
  },
} as ComponentMeta<typeof Logo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  token: 'default',
  subNetwork: 'kusama',
};
