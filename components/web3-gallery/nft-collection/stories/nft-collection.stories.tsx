import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import NftCollection from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/Nft Collection',
  component: NftCollection,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    imageSource: { control: 'text', defaultValue: 'https://www.w3schools.com/html/img_girl.jpg' },
    title: {
      control: 'text',
      defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non',
    },
    count: { control: 'number', defaultValue: 10 },
  },
} as ComponentMeta<typeof NftCollection>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NftCollection> = (args) => <NftCollection {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
