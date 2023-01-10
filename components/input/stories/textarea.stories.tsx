import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '..';

const { TextArea } = Input;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Textarea',
  component: TextArea,
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
      defaultValue: 'Text placeholder',
    },
    label: {
      control: 'text',
      defaultValue: '',
    },
  },
} as ComponentMeta<typeof TextArea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const WithLabel = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
  label: 'Textarea label',
};

export const WithStatus = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithStatus.args = {
  status: 'error',
};

export const WithLabelAndStatus = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabelAndStatus.args = {
  label: 'Textarea label',
  status: 'error',
};

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  label: 'Textarea label',
  status: 'error',
  value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  disabled: true,
};
