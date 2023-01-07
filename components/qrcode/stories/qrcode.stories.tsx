import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import QRCode from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/QRCode',
  component: QRCode,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: { control: 'text', defaultValue: '123123123123' },
    size: { control: 'number', defaultValue: 160 },
    iconSize: { control: 'number', defaultValue: 40 },
    color: { control: 'text', defaultValue: '#000' },
    errorLevel: { control: 'radio', options: ['M', 'L', 'Q', 'H'], defaultValue: 'M' },
    status: { control: 'radio', options: ['active', 'expired', 'loading'], defaultValue: 'active' },
    bordered: { control: 'boolean', defaultValue: true },
  },
} as ComponentMeta<typeof QRCode>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QRCode> = (args) => <QRCode {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  // eslint-disable-next-line react/jsx-no-useless-fragment
};

export const QRWithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
QRWithIcon.args = {
  // eslint-disable-next-line global-require
  icon: require('../QrCodeIcon.png'),
};
