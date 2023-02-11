import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { MagnifyingGlass } from 'phosphor-react';
import PageIcon from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Page Icon',
  component: PageIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: { control: 'color', defaultValue: '#4CEAAC' },
  },
} as ComponentMeta<typeof PageIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PageIcon> = ({ color }) => (
  <PageIcon
    color={color}
    iconProps={{
      type: 'phosphor',
      phosphorIcon: MagnifyingGlass,
    }}
  />
);

export const Default = Template.bind({});
