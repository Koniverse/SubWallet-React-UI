import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Divider from '..';
import Typography from '../../typography';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Divider',
  component: Divider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    dashed: { control: 'boolean' },
    type: { control: 'radio', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
  },
} as ComponentMeta<typeof Divider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Divider> = (args) => (
  <div>
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
    <Typography.Text>This is content</Typography.Text>
    <Divider {...args} />
  </div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  dashed: false,
};

export const Dash = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dash.args = {
  dashed: true,
};

export const Vertical = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Vertical.args = {
  type: 'vertical',
};
