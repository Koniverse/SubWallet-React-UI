import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchOutlined } from '@ant-design/icons';
import Button from './button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'dashed', 'ghost', 'text', 'link'],
      defaultValue: 'primary',
    },
    size: { control: 'radio', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
    shape: { control: 'radio', options: ['default', 'round', 'circle'], defaultValue: 'default' },
    loading: { control: 'boolean', defaultValue: false },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  type: 'primary',
  children: <>Button</>,
};

export const Icon = Template.bind({});
Icon.args = {
  type: 'primary',
  shape: 'circle',
  icon: <SearchOutlined />,
};
