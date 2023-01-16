import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddressBook, CaretRight, CheckCircle } from 'phosphor-react';
import SettingItem from '..';
import BackgroundIcon from '../../../background-icon';
import Icon from '../../../icon';
import Switch from '../../../switch';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/SettingItem',
  component: SettingItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: { control: 'text', defaultValue: 'Polkadot' },
    withDivider: { control: 'boolean', defaultValue: false },
    dividerPadding: {
      control: 'number',
      defaultValue: 12,
      if: { arg: 'withDivider', truthy: true },
    },
  },
} as ComponentMeta<typeof SettingItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SettingItem> = (args) => <SettingItem {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  leftItemIcon: (
    <BackgroundIcon
      type="phosphor"
      phosphorIcon={AddressBook}
      iconColor="#FFF"
      weight="fill"
      size="sm"
    />
  ),
};

export const WithCheckCircle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCheckCircle.args = {
  leftItemIcon: (
    <BackgroundIcon
      type="phosphor"
      phosphorIcon={AddressBook}
      iconColor="#FFF"
      weight="fill"
      size="sm"
    />
  ),
  rightComponent: (
    <Icon
      type="phosphor"
      phosphorIcon={CheckCircle}
      iconColor="#4CEAAC"
      weight="fill"
      size="sm"
      className="ant-setting-item-right-icon"
    />
  ),
};

export const WithCaretRight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCaretRight.args = {
  leftItemIcon: (
    <BackgroundIcon
      type="phosphor"
      phosphorIcon={AddressBook}
      iconColor="#FFF"
      weight="fill"
      size="sm"
    />
  ),
  rightComponent: (
    <Icon
      type="phosphor"
      phosphorIcon={CaretRight}
      size="xs"
      className="ant-setting-item-right-icon"
    />
  ),
};

export const WithToggle = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithToggle.args = {
  leftItemIcon: (
    <BackgroundIcon
      type="phosphor"
      phosphorIcon={AddressBook}
      iconColor="#FFF"
      weight="fill"
      size="sm"
    />
  ),
  rightComponent: <Switch style={{ marginRight: 8 }} />,
};

export const NoIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoIcon.args = {};

export const NoLeftIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoLeftIcon.args = {
  rightComponent: (
    <Icon
      type="phosphor"
      phosphorIcon={CheckCircle}
      iconColor="#4CEAAC"
      weight="fill"
      size="sm"
      className="ant-setting-item-right-icon"
    />
  ),
};
