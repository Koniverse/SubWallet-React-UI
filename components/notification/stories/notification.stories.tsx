import React, { useContext } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Info } from 'phosphor-react';
import type { NotificationProps } from '../NotificationProvider';
import NotificationProvider, { NotificationContext } from '../NotificationProvider';
import Button from '../../button';
import Icon from '../../icon';

// eslint-disable-next-line react/jsx-no-useless-fragment
const Notification: React.FC<NotificationProps> = () => <></>;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Notification',
  component: Notification,
  decorators: [
    (Story: any) => (
      <NotificationProvider>
        <Story />
      </NotificationProvider>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    message: { control: 'text', defaultValue: 'Toast title' },
    // description: { control: 'text', defaultValue: 'Toast title' },
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    duration: { control: 'number', defaultValue: 1.5 },
    placement: {
      control: 'radio',
      options: ['top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      defaultValue: 'top',
    },
    type: { control: 'radio', options: ['default', 'success', 'info', 'warning', 'error'] },
  } as ComponentMeta<typeof Notification>,
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Notification> = (args) => {
  const {
    message,
    description,
    icon,
    style,
    duration,
    placement = 'top',
    direction,
    btn,
    onClick,
    onClose,
    className,
    closeIcon,
    type,
    update,
  } = args;
  const { showNotification } = useContext(NotificationContext);
  return (
    <div
      style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Button
        onClick={() =>
          showNotification({
            message,
            description,
            icon,
            direction,
            style,
            duration,
            placement,
            btn,
            onClick,
            onClose,
            className,
            closeIcon,
            type,
            update,
          })
        }
      >
        Click me!
      </Button>
    </div>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const Success = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Success.args = {
  type: 'success',
};

export const Warning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Warning.args = {
  type: 'warning',
};

export const InfoToast = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InfoToast.args = {
  type: 'info',
};

export const Error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Error.args = {
  type: 'error',
};

export const WithIcon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithIcon.args = {
  icon: <Icon type="phosphor" phosphorIcon={Info} iconColor="#FFF" size="md" />,
};

export const Vertical = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Vertical.args = {
  icon: <Icon type="phosphor" phosphorIcon={Info} iconColor="#FFF" size="md" />,
  direction: 'vertical',
};
