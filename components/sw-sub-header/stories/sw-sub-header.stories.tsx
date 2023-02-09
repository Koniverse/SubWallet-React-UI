import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useMemo } from 'react';
import { renderRightIcons, RIGHT_ICON_TYPES } from '../../sw-screen-layout/stories/header-icons';
import type { ButtonProps } from '../../button';
import SwSubHeader from '../index';

interface WrapperProps extends React.ComponentProps<typeof SwSubHeader> {
  rightIconType: number;
}
const Wrapper: React.FC<WrapperProps> = ({ rightIconType, ...args }) => {
  const rightButtons = useMemo(
    (): ButtonProps[] => renderRightIcons(rightIconType),
    [rightIconType],
  );

  return <SwSubHeader {...args} rightButtons={rightButtons} />;
};
export default {
  title: 'Layout/SwSubHeader',
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
    showBackButton: {
      type: 'boolean',
    },
    rightIconType: {
      type: 'number',
      control: {
        type: 'number',
        min: RIGHT_ICON_TYPES.min,
        max: RIGHT_ICON_TYPES.max,
      },
    },
    title: {
      type: 'string',
    },
    paddingVertical: {
      type: 'boolean',
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
  showBackButton: true,
  title: 'Screen title',
  rightIconType: 1,
  paddingVertical: false,
};
