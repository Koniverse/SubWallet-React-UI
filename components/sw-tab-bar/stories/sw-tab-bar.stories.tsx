import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { TabBarItems } from './tab-bar-items';
import SwTabBar from '../index';

export default {
  title: 'Layout/SwTabBar',
  component: SwTabBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SwTabBar>;

const Template: ComponentStory<typeof SwTabBar> = (args) => {
  const [selected, setSelected] = useState('token');
  const onSelect = useCallback(
    (key: string) => () => {
      setSelected(key);
    },
    [],
  );

  return (
    <div
      style={{ marginRight: -16, marginLeft: -16, position: 'absolute', bottom: 0, width: '100%' }}
    >
      <SwTabBar
        {...args}
        items={TabBarItems.map((i) => ({
          ...i,
          onClick: onSelect(i.key),
        }))}
        selected={selected}
      />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
