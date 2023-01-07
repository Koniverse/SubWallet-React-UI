import React, { useCallback, useContext } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '../provider';
import Button from '../../button';
import Modal from '../index';
import Icon from '../../icon';

interface WrapperProps extends React.ComponentProps<typeof Modal> {
  closable: boolean;
  footerElement: number;
}

const defaultId = 'default';

const Wrapper: React.FC<WrapperProps> = ({ footerElement, onCancel, onOk, ...args }) => {
  const { activeModal, inactiveModal, addConfirmModal } = useContext(ModalContext);

  const handleOpenModal = useCallback(() => {
    activeModal(defaultId);
  }, [activeModal]);

  const handleOk = useCallback(() => {
    inactiveModal(defaultId);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onOk && onOk();
  }, [inactiveModal, onOk]);

  const handleCancel = useCallback(() => {
    inactiveModal(defaultId);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onCancel && onCancel();
  }, [onCancel, inactiveModal]);

  const renderFooter = useCallback(
    (order: number): React.ReactNode | undefined => {
      switch (order) {
        case 1:
          return (
            <Button
              block
              danger
              icon={<Icon type='fontAwesome' fontawesomeIcon={faCircleXmark} />}
              // @ts-ignore
              onClick={handleCancel}
            >
              Delete
            </Button>
          );
        case 2:
          return (
            <Button
              block
              icon={<Icon type='fontAwesome' fontawesomeIcon={faCircleCheck} />}
              // @ts-ignore
              onClick={handleCancel}
            >
              Confirm
            </Button>
          );
        default:
          return undefined;
      }
    },
    [handleCancel],
  );

  const handleOpenWaringModal = useCallback(() => {
    const id = 'test-confirm';
    addConfirmModal({
      closable: true,
      content: 'If someone has your secret phrase, they will have full control of your account',
      id,
      okText: 'Confirm',
      onCancel: () => {
        inactiveModal(id);
      },
      onOk: () => {
        inactiveModal(id);
      },
      subTitle: 'Do not share your secret phrase!',
      title: 'Confirmation',
      type: 'warning',
    });
  }, [addConfirmModal, inactiveModal]);

  const handleOpenDangerModal = useCallback(() => {
    const id = 'test-warning';
    addConfirmModal({
      closable: true,
      content: 'If someone has your secret phrase, they will have full control of your account',
      id,
      okText: 'Delete',
      onCancel: () => {
        inactiveModal(id);
      },
      onOk: () => {
        inactiveModal(id);
      },
      subTitle: 'Do not share your secret phrase!',
      title: 'Select account',
      type: 'error',
    });
  }, [addConfirmModal]);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        <Button onClick={handleOpenModal} type="default">
          Default
        </Button>
        <Button onClick={handleOpenWaringModal} type="default">
          Warning
        </Button>
        <Button onClick={handleOpenDangerModal} type="default">
          Danger
        </Button>
      </div>
      <Modal
        {...args}
        footer={renderFooter(footerElement)}
        id={defaultId}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/SWModal',
  component: Wrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      type: 'string',
    },
    closable: {
      type: 'boolean',
    },
    forceRenderFooter: {
      type: 'boolean',
    },
    footerElement: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 2,
      },
    },
  },
} as ComponentMeta<typeof Wrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  children: 'Modal',
  title: 'Modal',
  maskClosable: false,
  closable: false,
  forceRenderFooter: true,
  footerElement: 2,
};
