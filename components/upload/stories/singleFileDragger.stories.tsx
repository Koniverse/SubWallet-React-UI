import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Upload from '..';

const { SingleFileDragger } = Upload;

export default {
  title: 'Form/Single File Dragger',
  component: SingleFileDragger,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SingleFileDragger>;

const Template: ComponentStory<typeof SingleFileDragger> = (args) => (
  <SingleFileDragger {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Import from Polkadot.js',
  hint: 'Please drag an drop the .json file you  exported  from Polkadot.js',
};
