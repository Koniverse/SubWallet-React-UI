import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Squircle from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Squircle',
  component: Squircle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'radio',
      options: [undefined, 'xs', 'sm', 'md', 'lg'],
      defaultValue: 'lg',
    },
    inline: {
      control: 'boolean',
    },
    customSize: { control: 'object', defaultValue: undefined },
    fill: { control: 'color', defaultValue: '#004BFF' },
  },
} as ComponentMeta<typeof Squircle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Squircle> = (args) => <Squircle {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  children: <></>,
};
