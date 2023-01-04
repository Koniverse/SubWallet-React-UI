import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip from '..';
import Typography from '../../typography';

const { Text } = Typography;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Tooltip',
  component: Tooltip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    placement: {
      control: 'radio',
      options: [
        'top',
        'left',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ],
      defaultValue: 'top',
    },
    title: {
      control: 'text',
      defaultValue: 'This is Tooltip',
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Tooltip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Tooltip {...args}>
      <Text>Hover this text </Text>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
