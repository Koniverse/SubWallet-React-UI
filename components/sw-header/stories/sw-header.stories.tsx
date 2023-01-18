import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import SelectModal from '../../select-modal';
import type { ButtonProps } from '../../button';
import SwHeader from '../index';
import { HeaderIcons } from '../../sw-screen-layout/stories/header-icons';
import {
  ALL_ACCOUNT_KEY,
  PREDEFINED_ACCOUNTS,
  renderHeaderContentItem,
  renderHeaderContentSelected,
} from '../../sw-screen-layout/stories/header-content';

interface WrapperProps extends React.ComponentProps<typeof SwHeader> {
  rightType: number;
  selectBackground: 'default' | 'transparent';
}

const SELECT_MODAL_ID = 'select-account';
const Wrapper: React.FC<WrapperProps> = ({ rightType, selectBackground, ...args }) => {
  const [selected, setSelected] = useState<string>(ALL_ACCOUNT_KEY);

  const rightButtons = useMemo((): ButtonProps[] => {
    switch (rightType) {
      case 2:
        return [HeaderIcons.icon1, HeaderIcons.icon2, HeaderIcons.icon3].map((icon) => ({
          icon,
        }));
      case 1:
        return [
          {
            icon: HeaderIcons.icon,
          },
        ];
      default:
        return [];
    }
  }, [rightType]);

  return (
    <SwHeader {...args} rightButtons={rightButtons}>
      {/* @ts-ignore */}
      <SelectModal
        inputWidth={220}
        items={PREDEFINED_ACCOUNTS}
        itemKey="address"
        selected={selected}
        renderItem={renderHeaderContentItem}
        onSelect={setSelected}
        id={SELECT_MODAL_ID}
        renderSelected={renderHeaderContentSelected}
        shape='round'
        title="Select Account"
        background={selectBackground}
      />
    </SwHeader>
  );
};
export default {
  title: 'Layout/SwHeader',
  component: Wrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    background: {
      control: 'radio',
      options: ['default', 'transparent'],
    },
    center: {
      type: 'boolean',
    },
    showLeftButton: {
      type: 'boolean',
    },
    selectBackground: {
      control: 'radio',
      options: ['default', 'transparent'],
    },
    paddingVertical: {
      type: 'boolean',
    },
    rightType: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 2,
        step: 1,
      },
    },
  },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <div style={{ margin: -16 }}>
    <Wrapper {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  background: 'default',
  center: true,
  showLeftButton: true,
  rightType: 1,
  selectBackground: 'transparent',
  paddingVertical: false,
};
