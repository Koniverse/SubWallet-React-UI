import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { CaretRight, CheckCircle, MinusCircle } from 'phosphor-react';
import TokenItem from '..';
import Icon from '../../../icon';
import Switch from '../../../switch';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/TokenItem',
  component: TokenItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text', defaultValue: 'DOT' },
    subName: { control: 'text', defaultValue: 'Polkadot' },
    symbol: { control: 'text', defaultValue: 'dot' },
    isShowSubLogo: { control: 'boolean', defaultValue: false },
    withDivider: { control: 'boolean', defaultValue: false },
    dividerPadding: {
      control: 'number',
      defaultValue: 48,
      if: { arg: 'withDivider', truthy: true },
    },
  },
} as ComponentMeta<typeof TokenItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TokenItem> = (args) => <TokenItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  networkMainLogoShape: 'circle',
  networkMainLogoSize: 28,
};

export const WithCaretRight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCaretRight.args = {
  networkMainLogoShape: 'circle',
  networkMainLogoSize: 28,
  rightItem: (
    <Icon
      type="phosphor"
      phosphorIcon={CaretRight}
      size="xs"
      className="ant-network-item-right-icon"
    />
  ),
};

export const WithMinusCircle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithMinusCircle.args = {
  networkMainLogoShape: 'circle',
  networkMainLogoSize: 28,
  rightItem: (
    <Icon
      type="phosphor"
      phosphorIcon={MinusCircle}
      size="sm"
      iconColor="#BF1616"
      weight="fill"
      className="ant-network-item-right-icon"
    />
  ),
};

export const WithCheckCircle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCheckCircle.args = {
  networkMainLogoShape: 'circle',
  networkMainLogoSize: 28,
  rightItem: (
    <Icon
      type="phosphor"
      phosphorIcon={CheckCircle}
      size="sm"
      iconColor="#4CEAAC"
      weight="fill"
      className="ant-network-item-right-icon"
    />
  ),
};

export const WithToggle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithToggle.args = {
  rightItem: <Switch style={{ marginRight: 8 }} />,
  dividerPadding: 58,
};
