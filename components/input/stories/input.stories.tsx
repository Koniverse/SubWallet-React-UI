import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Copy, Key } from 'phosphor-react';
import Input from '..';
import Icon from '../../icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    shape: {
      control: 'radio',
      options: ['default', 'square', 'round'],
      defaultValue: 'default',
    },
    status: {
      control: 'radio',
      options: ['warning', 'error', 'success', undefined],
      defaultValue: undefined,
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Text placeholder',
    },
    label: {
      control: 'text',
      defaultValue: '',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Square = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Square.args = {
  shape: 'square',
};

export const Round = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Round.args = {
  shape: 'round',
};

export const WithLabel = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
  label: 'Input label',
};

export const WithStatus = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithStatus.args = {
  status: 'error',
};

export const WithLabelAndStatus = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabelAndStatus.args = {
  label: 'Input label',
  status: 'error',
};

export const WithPrefix = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithPrefix.args = {
  prefix: <Icon phosphorIcon={Key} customSize="20px" />,
};

export const WithSuffix = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithSuffix.args = {
  suffix: (
    <div className='__input-action'>
      <Icon phosphorIcon={Copy} />
    </div>
  ),
};

export const WithPrefixSuffixStatusLabel = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithPrefixSuffixStatusLabel.args = {
  label: 'Input label',
  status: 'error',
  suffix: (
    <div className='__input-action'>
      <Icon phosphorIcon={Copy} />
    </div>
  ),
  prefix: <Icon phosphorIcon={Key} customSize="20px" />,
};

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  label: 'Input label',
  status: 'error',
  suffix: (
    <div className='__input-action'>
      <Icon phosphorIcon={Copy} />
    </div>
  ),
  prefix: <Icon phosphorIcon={Key} customSize="20px" />,
  value: 'Input value',
  disabled: true,
};
