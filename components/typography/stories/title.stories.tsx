import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Typography from '..';

const { Title } = Typography;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Heading',
  component: Title,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    level: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6],
      defaultValue: undefined,
    },
    superLevel: {
      control: 'select',
      options: [undefined, 1, 2, 3],
      defaultValue: undefined,
    },
  },
} as ComponentMeta<typeof Title>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Level = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Level.args = {
  level: undefined,
  children: 'Heading',
};

export const SuperLevel = Template.bind({});
SuperLevel.args = {
  level: undefined,
  superLevel: 3,
  children: 'Super Heading',
};
