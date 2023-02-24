import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import SwAlert from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/SwAlert',
  component: SwAlert,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: { control: 'select', options: ['info', 'warning', 'danger', 'success'], defaultValue: 'info' },
    title: { control: 'text', defaultValue: 'Alert' },
    description: { control: 'text', defaultValue: 'Description message' },
  },
} as ComponentMeta<typeof SwAlert>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwAlert> = (args) => <SwAlert {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};

export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Warning.args = {
  type: 'warning',
};

export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
  type: 'danger',
};

export const Success = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Success.args = {
  type: 'success',
};

export const InfoWithBordered = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InfoWithBordered.args = {
  description: undefined,
};

export const WarningWithBordered = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WarningWithBordered.args = {
  type: 'warning',
  description: undefined,
};

export const ErrorWithBordered = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ErrorWithBordered.args = {
  type: 'danger',
  description: undefined,
};

export const SuccessWithBordered = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SuccessWithBordered.args = {
  type: 'success',
  description: undefined,
};

