import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { CaretUp, MagnifyingGlass, WifiHigh } from 'phosphor-react';
import { faChevronUp, faMagnifyingGlass, faWifi } from '@fortawesome/free-solid-svg-icons';
import { SearchOutlined, WifiOutlined, UpOutlined } from '@ant-design/icons';
import Icon from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Icon',
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'],
      defaultValue: 'md',
    },
    iconColor: { control: 'color', defaultValue: '#FFFFFF' },
  },
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => (
  <>
    <div>
      <Icon {...args} type="phosphor" phosphorIcon={MagnifyingGlass} />
      <Icon {...args} type="phosphor" phosphorIcon={WifiHigh} />
      <Icon {...args} type="phosphor" phosphorIcon={CaretUp} />
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
    <div>
      <Icon {...args} type="customIcon" customIcon={(
        <svg
          fill='none'
          height='1em'
          viewBox='0 0 16 16'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.06297 5.59028C6.23731 3.46991 9.76271 3.46991 11.937 5.59028L12.1987 5.84546C12.3075 5.95146 12.3075 6.12336 12.1987 6.22936L11.3036 7.10232C11.2492 7.15532 11.1611 7.15532 11.1067 7.10232L10.7466 6.75115C9.22968 5.27194 6.77033 5.27194 5.25341 6.75115L4.86774 7.12722C4.81337 7.18022 4.72526 7.18022 4.67089 7.12722L3.77572 6.25425C3.66698 6.14826 3.66698 5.97636 3.77572 5.87036L4.06297 5.59028ZM13.7884 7.39562L14.5851 8.17254C14.6939 8.27854 14.6939 8.45044 14.5851 8.55644L10.9926 12.0597C10.8839 12.1657 10.7077 12.1657 10.5989 12.0597L8.04924 9.57336C8.02206 9.54683 7.97801 9.54683 7.95082 9.57336L5.40113 12.0597C5.29244 12.1657 5.11617 12.1657 5.00743 12.0597L1.41488 8.55639C1.30616 8.45039 1.30616 8.27849 1.41488 8.17249L2.2116 7.39556C2.32032 7.28952 2.49658 7.28952 2.6053 7.39556L5.15504 9.88194C5.18223 9.90847 5.22628 9.90847 5.25346 9.88194L7.80311 7.39556C7.9118 7.28952 8.08807 7.28952 8.19681 7.39556L10.7466 9.88194C10.7737 9.90847 10.8178 9.90847 10.845 9.88194L13.3947 7.39562C13.5034 7.28957 13.6797 7.28957 13.7884 7.39562Z'
            fill='currentColor'
          />
        </svg>
      )} />
      <Icon {...args} type="customIcon" customIcon={(
        <svg
          fill='none'
          height='1em'
          viewBox='0 0 16 24'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.8 8.71982V5.79499L2.81557 0L0 1.24374V11.4943L9.74516 15.8269L4.49671 18.1367V15.8269L2.28253 14.8292L0 15.8269V22.7973L2.69256 24L15.8 18.1503V13.7631L4.34637 8.66515V6.01367L13.1211 9.92255L15.8 8.71982Z'
            fill='currentColor'
          />
        </svg>
      )} />
    </div>
  </>
);

export const SwIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
