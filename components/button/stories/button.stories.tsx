import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchOutlined } from '@ant-design/icons';
import { PresetShapeTypes } from '../../_util/shapes';
import Button from '../button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: {
      control: 'radio',
      options: [undefined, 'default', 'ghost'],
      defaultValue: undefined,
    },
    size: {
      control: 'radio',
      options: [undefined, 'xs', 'sm', 'md', 'lg'],
      defaultValue: undefined,
    },
    shape: {
      control: 'radio',
      options: [undefined, ...PresetShapeTypes],
      defaultValue: undefined,
    },
    schema: {
      control: 'radio',
      options: [undefined, 'primary', 'secondary', 'warning', 'danger', 'error'],
      defaultValue: undefined,
    },
    block: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: { control: 'boolean', defaultValue: false },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    danger: {
      control: 'boolean',
      defaultValue: false,
    },
    children: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  type: 'default',
  children: <>Button</>,
};

export const Icon = Template.bind({});
Icon.args = {
  type: 'default',
  shape: 'circle',
  icon: <SearchOutlined />,
};
