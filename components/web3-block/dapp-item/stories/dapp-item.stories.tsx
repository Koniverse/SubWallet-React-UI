import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { DotsThree, Star } from 'phosphor-react';
import DAppItem from '..';
import Button from '../../../button';
import Icon from '../../../icon';
import Tag from '../../../tag';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/DAppItem',
  component: DAppItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    src: { control: 'text', defaultValue: 'https://via.placeholder.com/200/004BFF' },
    dAppName: { control: 'text', defaultValue: '1Beam' },
    dAppTitle: { control: 'text', defaultValue: 'Multichain Stableswap DEX' },
  },
} as ComponentMeta<typeof DAppItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DAppItem> = (args) => <DAppItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  rightItem: (
    <Button
      type="ghost"
      size='xs'
      icon={
        <Icon
          type="phosphor"
          phosphorIcon={DotsThree}
          iconColor="rgba(255, 255, 255, 0.45)"
          size="sm"
        />
      }
    />
  ),
};

export const CategoryItem = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CategoryItem.args = {
  dAppTag: (
    <Tag color="secondary" bgType="gray">
      DeFi
    </Tag>
  ),
  rightItem: (
    <Button
      size='xs'
      type="ghost"
      icon={
        <Icon type="phosphor" phosphorIcon={Star} iconColor="rgba(255, 255, 255, 0.45)" size="sm" />
      }
    />
  ),
};
