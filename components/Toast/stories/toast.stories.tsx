import React, { useContext } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Toast from '..';
import ToastProvider, { ToastContext } from '../ToastProvider';
import Button from '../../button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Toast',
  component: Toast,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {},
} as ComponentMeta<typeof Toast>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Toast> = (args) => {
  const { show } = useContext(ToastContext);
  return (
    <div>
      <Toast {...args} />
      <Button title={'Click mee'} onClick={() => show('hiiiiiiii')} />
    </div>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
