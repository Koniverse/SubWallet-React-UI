import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import PinCode from '../index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/PinCode',
  component: PinCode,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    pinCodeLength: {
      control: 'number',
      defaultValue: 6,
    },
    initialValue: { control: 'text', defaultValue: '' },
  },
} as ComponentMeta<typeof PinCode>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PinCode> = (args) => <PinCode {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
