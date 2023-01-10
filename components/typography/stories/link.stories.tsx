import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { PaperPlaneTilt } from 'phosphor-react';
import Typography from '..';
import IconComponent from '../../icon';

const { Link } = Typography;

export default {
  title: 'Core/Typography/Link',
  component: Link,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'radio',
      options: [undefined, 'xs', 'sm', 'md', 'lg'],
      defaultValue: 'lg',
    },
    underline: {
      control: 'boolean',
      defaultValue: false,
    },
    ellipsis: {
      table: {
        disable: true,
      },
    },
    editable: {
      table: {
        disable: true,
      },
    },
    copyable: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Link>;

const icon = <IconComponent type="phosphor" phosphorIcon={PaperPlaneTilt} />;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Link',
  underline: false,
};

export const Icon = Template.bind({});
Icon.args = {
  children: 'Link',
  underline: false,
  icon,
};

export const Underline = Template.bind({});
Underline.args = {
  children: 'Link',
  underline: true,
};

export const IconUnderline = Template.bind({});
IconUnderline.args = {
  children: 'Link',
  underline: true,
  icon,
};
