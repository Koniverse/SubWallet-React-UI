import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import SwQRCode from '../SwQRCode';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/SwQRCode',
  component: SwQRCode,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: { control: 'text', defaultValue: '123123123123' },
    size: { control: 'number', defaultValue: 264 },
    logoPadding: { control: 'number', defaultValue: 6 },
    color: { control: 'text', defaultValue: '#000' },
    errorLevel: { control: 'radio', options: ['M', 'L', 'Q', 'H'], defaultValue: 'M' },
    status: { control: 'radio', options: ['active', 'expired', 'loading'], defaultValue: 'active' },
  },
} as ComponentMeta<typeof SwQRCode>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwQRCode> = (args) => <SwQRCode {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const QRWithoutIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
QRWithoutIcon.args = {
  icon: '',
};
