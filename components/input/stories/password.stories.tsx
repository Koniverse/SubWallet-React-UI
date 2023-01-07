import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '..';

const { Password } = Input;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Password',
  component: Password,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    shape: {
      control: 'radio',
      options: ['default', 'square', 'round'],
      defaultValue: 'default',
    },
    status: {
      control: 'radio',
      options: ['warning', 'error', 'success', undefined],
      defaultValue: undefined,
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Password placeholder',
    },
    label: {
      control: 'text',
      defaultValue: '',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Password>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Password> = (args) => <Password {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Square = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Square.args = {
  shape: 'square',
};

export const Round = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Round.args = {
  shape: 'round',
};

export const WithLabel = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
  label: 'Password label',
};

export const WithStatus = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithStatus.args = {
  status: 'error',
};

export const WithLabelAndStatus = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabelAndStatus.args = {
  label: 'Password label',
  status: 'error',
};

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  label: 'Password label',
  status: 'error',
  value: 'Input value',
  disabled: true,
};
