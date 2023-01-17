import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { CaretUp, MagnifyingGlass, WifiHigh } from 'phosphor-react';
import { faChevronUp, faMagnifyingGlass, faWifi } from '@fortawesome/free-solid-svg-icons';
import type { StepBackwardOutlined } from '@ant-design/icons';
import { SearchOutlined, WifiOutlined, UpOutlined } from '@ant-design/icons';
import BackgroundIcon from '..';

export type AntIconType = typeof StepBackwardOutlined;
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Background Icon',
  component: BackgroundIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'],
      defaultValue: 'md',
    },
    iconColor: { control: 'color', defaultValue: '#FFFFFF' },
    shape: {
      control: 'radio',
      options: ['squircle', 'rounded', 'circle', 'square'],
      defaultValue: 'square',
    },
  },
} as ComponentMeta<typeof BackgroundIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BackgroundIcon> = (args) => (
  <>
    <div style={{ paddingBottom: 16, display: 'flex', width: 144, justifyContent: 'space-around' }}>
      <BackgroundIcon {...args} type="phosphor" phosphorIcon={MagnifyingGlass} />
      <BackgroundIcon {...args} type="phosphor" phosphorIcon={WifiHigh} />
      <BackgroundIcon {...args} type="phosphor" phosphorIcon={CaretUp} />
    </div>
    <div style={{ paddingBottom: 16, display: 'flex', width: 144, justifyContent: 'space-around' }}>
      <BackgroundIcon {...args} type="fontAwesome" fontawesomeIcon={faMagnifyingGlass} />
      <BackgroundIcon {...args} type="fontAwesome" fontawesomeIcon={faWifi} />
      <BackgroundIcon {...args} type="fontAwesome" fontawesomeIcon={faChevronUp} />
    </div>
    <div style={{ paddingBottom: 16, display: 'flex', width: 144, justifyContent: 'space-around' }}>
      <BackgroundIcon {...args} type="antDesignIcon" antDesignIcon={SearchOutlined} />
      <BackgroundIcon {...args} type="antDesignIcon" antDesignIcon={WifiOutlined} />
      <BackgroundIcon {...args} type="antDesignIcon" antDesignIcon={UpOutlined} />
    </div>
  </>
);

export const SwIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
