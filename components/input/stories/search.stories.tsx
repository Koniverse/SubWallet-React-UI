import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { FadersHorizontal } from 'phosphor-react';
import Input from '..';
import Icon from '../../icon';

const { Search } = Input;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Search',
  component: Search,
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
} as ComponentMeta<typeof Search>;

const onSearch = (value: string) => {
  console.log('onSearch', value);
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Search> = (args) => (
  <Search {...args} onSearch={onSearch} displaySuccessStatus />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  suffix: (
    <div className='__input-action'>
      <Icon phosphorIcon={FadersHorizontal} weight="fill" />
    </div>
  ),
};

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

export const Disabled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  label: 'Input label',
  status: 'error',
  value: 'Search value',
  disabled: true,
};
