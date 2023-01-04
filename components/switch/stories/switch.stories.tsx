import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Switch from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Switch',
  component: Switch,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    checked: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Switch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Checked = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Checked.args = {
  checked: true,
};

export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Loading.args = {
  loading: true,
};
