import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { PaperPlaneTilt } from 'phosphor-react';
import { PresetShapeTypes } from '../../_util/shapes';
import Button from '../button';
import IconComponent from '../../icon';

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

const icon = <IconComponent type="phosphor" phosphorIcon={PaperPlaneTilt} />;

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
  icon,
};

export const Squircle = Template.bind({});
Squircle.args = {
  type: 'default',
  shape: 'squircle',
  icon,
};

export const IconWithText = Template.bind({});
IconWithText.args = {
  type: 'default',
  children: <>Button</>,
  icon,
};

export const GhostIcon = Template.bind({});
GhostIcon.args = {
  type: 'ghost',
  size: 'xs',
  icon,
};

export const GhostIconWithText = Template.bind({});
GhostIconWithText.args = {
  type: 'ghost',
  size: 'xs',
  children: <>Button</>,
  icon,
};
