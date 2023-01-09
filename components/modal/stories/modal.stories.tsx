import React, { useCallback, useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../../button';
import Modal from '../index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modal/Modal',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = ({ onOk, onCancel, ...args }) => {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleOk = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setVisible(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onOk && onOk(e);
    },
    [onOk],
  );

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setVisible(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onCancel && onCancel(e);
    },
    [onCancel],
  );

  return (
    <div>
      <Button onClick={handleOpenModal} type="default" size='xs'>
        Open
      </Button>
      <Modal {...args} open={visible} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Modal',
  maskClosable: false,
  centered: true,
};
