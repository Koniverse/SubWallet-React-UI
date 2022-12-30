import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { CaretUp, MagnifyingGlass, WifiHigh } from 'phosphor-react';
import { faChevronUp, faMagnifyingGlass, faWifi } from '@fortawesome/free-solid-svg-icons';
import type { StepBackwardOutlined } from '@ant-design/icons';
import { SearchOutlined, WifiOutlined, UpOutlined } from '@ant-design/icons';
import Icon from '..';

export type AntIconType = typeof StepBackwardOutlined;
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Icon',
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: { control: 'radio', options: ['phosphor', 'fontAwesome'], defaultValue: 'phosphor' },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'],
      defaultValue: 'md',
    },
    fill: { control: 'color', defaultValue: '#004BFF' },
    iconColor: { control: 'color', defaultValue: '#FFFFFF' },
  },
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => (
  <>
    <div>
      <Icon {...args} phosphorIcon={MagnifyingGlass} />
      <Icon {...args} phosphorIcon={WifiHigh} />
      <Icon {...args} phosphorIcon={CaretUp} />
    </div>
    <div>
      <Icon {...args} type="fontAwesome" fontawesomeIcon={faMagnifyingGlass} />
      <Icon {...args} type="fontAwesome" fontawesomeIcon={faWifi} />
      <Icon {...args} type="fontAwesome" fontawesomeIcon={faChevronUp} />
    </div>
    <div>
      <Icon {...args} type="antDesignIcon" antDesignIcon={SearchOutlined} />
      <Icon {...args} type="antDesignIcon" antDesignIcon={WifiOutlined} />
      <Icon {...args} type="antDesignIcon" antDesignIcon={UpOutlined} />
    </div>
  </>
);

export const SwIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
