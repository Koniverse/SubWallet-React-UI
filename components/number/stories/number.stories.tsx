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
    weight: {
      type: 'number',
      control: {
        type: 'range',
        min: 100,
        max: 900,
        step: 50,
      },
    },
    subFloatNumber: {
      type: 'boolean',
    },
    leftOpacity: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    leftColor: {
      control: 'color',
    },
    rightOpacity: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    rightColor: {
      control: 'color',
    },
  },
} as ComponentMeta<typeof Number>;

const Template: ComponentStory<typeof Number> = (args) => <Number {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  value: '1234567890',
  decimal: 8,
  prefix: '$',
  suffix: 'DOT',
  size: 16,
  subFloatNumber: true,
  leftOpacity: 1,
  leftColor: '#FFF',
  rightOpacity: 0.8,
  rightColor: '#FFF',
  weight: 500,
};
