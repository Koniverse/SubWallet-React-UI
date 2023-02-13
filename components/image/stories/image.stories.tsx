import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Image from '..';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Image',
  component: Image,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    shape: {
      control: 'radio',
      options: ['default', 'square', 'circle', 'squircle'],
      defaultValue: 'default',
    },
    width: { control: 'number' },
    height: { control: 'number', if: { arg: 'height', truthy: true } },
    responsive: { control: 'boolean', defaultValue: true },
    isLoading: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Image>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

const imgLink = 'https://via.placeholder.com/200/004BFF';
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  src: imgLink,
  width: 200,
  height: 200,
};

export const Square = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Square.args = {
  src: imgLink,
  shape: 'square',
  width: 200,
};

export const Circle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Circle.args = {
  src: imgLink,
  shape: 'circle',
  width: 200,
};

export const Squircle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Squircle.args = {
  src: imgLink,
  width: 200,
  shape: 'squircle',
};
