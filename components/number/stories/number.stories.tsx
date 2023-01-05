import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { PresetColorTypes } from '../../_util/colors';
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
    },
    subFloatNumber: {
      type: 'boolean',
    },
    leftOpacity: {
      type: 'number',
    },
    leftColor: {
      control: 'select',
      options: ['white', ...PresetColorTypes],
    },
    rightOpacity: {
      type: 'number',
    },
    rightColor: {
      control: 'select',
      options: ['white', ...PresetColorTypes],
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
  leftColor: 'white',
  rightOpacity: 0.8,
  rightColor: 'white',
  weight: 500,
};
