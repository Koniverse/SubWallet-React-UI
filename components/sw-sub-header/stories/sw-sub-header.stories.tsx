import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { QrCode, Gear, FunnelSimple, MagnifyingGlass } from 'phosphor-react';
import React, { useMemo } from 'react';
import type { ButtonProps } from '../../button';
import Icon from '../../icon';
import SwSubHeader from '../index';

const rightIcon = <Icon type="phosphor" phosphorIcon={QrCode} size="sm" />;
const rightIcon1 = <Icon type="phosphor" phosphorIcon={FunnelSimple} size="sm" />;
const rightIcon2 = <Icon type="phosphor" phosphorIcon={MagnifyingGlass} size="sm" />;
const rightIcon3 = <Icon type="phosphor" phosphorIcon={Gear} size="sm" />;

interface WrapperProps extends React.ComponentProps<typeof SwSubHeader> {
  rightIconType: number;
}
const Wrapper: React.FC<WrapperProps> = ({ rightIconType, ...args }) => {
  const rightButtons = useMemo((): ButtonProps[] => {
    switch (rightIconType) {
      case 2:
        return [rightIcon1, rightIcon2, rightIcon3].map((icon) => ({
          icon,
        }));
      case 1:
        return [
          {
            icon: rightIcon,
          },
        ];
      default:
        return [];
    }
  }, [rightIconType]);

  return <SwSubHeader {...args} rightButtons={rightButtons} />;
};
export default {
  title: 'Core/SwSubHeader',
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
    rightIconType: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 2,
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
  showLeftButton: true,
  title: 'Screen title',
  rightIconType: 1,
  paddingVertical: false,
};
