import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Number from '../index';

export default {
  title: 'Core/Number',
  component: Number,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: {
      type: 'string',
    },
    decimal: {
      type: 'number',
    },
    prefix: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    size: {
      type: 'number',
    },
    subFloatNumber: {
      type: 'boolean',
    },
  },
} as ComponentMeta<typeof Number>;

const Template: ComponentStory<typeof Number> = (args) => <Number {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  value: '15125125125',
  decimal: 12,
  prefix: '',
  suffix: '',
  size: 16,
  subFloatNumber: false,
};
