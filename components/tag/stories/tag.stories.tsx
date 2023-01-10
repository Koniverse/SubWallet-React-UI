import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  PresetBrandColorTypes,
  PresetColorTypes,
  PresetStatusColorTypes,
} from '../../_util/colors';
import Tag from '..';
import { PresetBarShapeTypes } from '../../_util/shapes';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Tag',
  component: Tag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    closable: { control: 'boolean' },
    shape: { control: 'select', options: PresetBarShapeTypes },
    color: {
      control: 'select',
      options: [...PresetBrandColorTypes, ...PresetStatusColorTypes, ...PresetColorTypes],
    },
    bgType: { control: 'radio', options: ['default', 'gray', 'filled'] },
  },
} as ComponentMeta<typeof Tag>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args}>{args.color || 'tags'}</Tag>;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  color: 'success',
};

export const Closeable = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Closeable.args = {
  closable: true,
  color: 'warning',
};

export const Rounded = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Rounded.args = {
  shape: 'round',
  color: 'purple',
};

export const BgGray = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BgGray.args = {
  shape: 'round',
  color: 'danger',
  bgType: 'gray',
};
export const BgFilled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BgFilled.args = {
  shape: 'round',
  color: 'danger',
  bgType: 'filled',
};
