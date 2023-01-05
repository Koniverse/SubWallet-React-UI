import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Spin from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Spin',
  component: Spin,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: { control: 'number', defaultValue: 40 },
    color: { control: 'text', defaultValue: '#888' },
  },
} as ComponentMeta<typeof Spin>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Spin> = (args) => <Spin {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
