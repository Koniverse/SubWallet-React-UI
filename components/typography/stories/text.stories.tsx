import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Typography from '..';

const { Text } = Typography;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Text',
  component: Text,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'radio',
      options: [undefined, 'xs', 'sm', 'md', 'lg'],
      defaultValue: undefined,
    },
    monospace: {
      control: 'boolean',
      defaultValue: false,
    },
    ellipsis: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Text>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Size = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Size.args = {
  // level: undefined,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet corporis cumque deleniti dicta distinctio dolores ea est et eveniet ipsam iste molestiae non possimus, recusandae rem sint. Cumque, eum?',
};

export const Monospace = Template.bind({});
Monospace.args = {
  // level: undefined,
  monospace: true,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet corporis cumque deleniti dicta distinctio dolores ea est et eveniet ipsam iste molestiae non possimus, recusandae rem sint. Cumque, eum?',
};
