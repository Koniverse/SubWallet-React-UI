import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { toShort } from '../../_util/address';

interface AddressProps {
  address: string;
  preLength?: number;
  sufLength?: number;
}

export const Address: React.FC<AddressProps> = ({ address, preLength, sufLength }) => (
  <div
    style={{
      color: 'rgba(255, 255, 255, 0.45)',
      fontSize: '12px',
      lineHeight: '20px',
      fontWeight: 500,
    }}
  >
    {toShort(address, preLength, sufLength)}
  </div>
);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Typography/Address',
  component: Address,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    address: { control: 'text', defaultValue: '0x25B12Fe4D6D7ACca1B4035b26b18B4602cA8b10F' },
    preLength: { control: 'number', defaultValue: 6 },
    subLength: { control: 'number', defaultValue: 6 },
  },
} as ComponentMeta<typeof Address>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Address> = (args) => <Address {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
