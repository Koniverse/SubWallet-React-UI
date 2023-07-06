import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import SwQrScanner from '../index';
import type { ScannerResult, SwQrScannerProps } from '../index';
import Button from '../../button';
import Icon from '../../icon';
import Progress from '../../progress';
import { ModalContext } from '../../sw-modal';

interface WrapperProps extends SwQrScannerProps {
  multipleFrame: boolean;
}

const modalId = 'qr-scanner-modal';

const Wrapper: React.FC<WrapperProps> = ({ isError, multipleFrame, ...args }) => {
  const { activeModal } = useContext(ModalContext);

  const [result, setResult] = useState('');

  const onOpen = useCallback(() => {
    activeModal(modalId);
  }, [activeModal]);

  const onClose = useCallback(() => {
    setResult('');
  }, []);

  const onSuccess = useCallback((scannerResult: ScannerResult) => {
    setResult(scannerResult.text);
  }, []);

  const overlay = useMemo((): React.ReactNode => {
    if (isError) {
      return (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'black',
              borderRadius: 8,
              border: '2px solid #BF1616',
              padding: '8px 16px',
            }}
          >
            <Icon
              type="fontAwesome"
              fontawesomeIcon={faXmarkCircle}
              iconColor="#BF1616"
              size="sm"
            />
            <div>Invalid QR code, please try again</div>
          </div>
        </div>
      );
    }

    if (multipleFrame) {
      return (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            width: '100%',
            padding: '0 8px',
          }}
        >
          <Progress percent={40} showInfo={false} />
        </div>
      );
    }

    if (result) {
      return (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'black',
              borderRadius: 8,
              border: '2px solid #004BFF',
              padding: '8px 16px',
            }}
          >
            <div style={{ overflowWrap: 'anywhere' }}>Result: {result}</div>
            <Button onClick={onClose} size="xs">
              Close scanner
            </Button>
          </div>
        </div>
      );
    }

    return undefined;
  }, [isError, result, onClose, multipleFrame]);

  const footer = useMemo((): React.ReactNode => {
    if (isError) {
      return undefined;
    }

    if (multipleFrame) {
      return (
        <div
          style={{
            width: '100%',
          }}
        >
          <div
            style={{
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            20/50
          </div>
          <div
            style={{
              marginTop: 30,
              width: '100%',
            }}
          >
            <Button icon={<Icon type="fontAwesome" fontawesomeIcon={faCheckCircle} />} block>
              Start over
            </Button>
          </div>
        </div>
      );
    }

    return undefined;
  }, [multipleFrame, isError]);

  return (
    <div
      id='scanner-container'
      style={{
        position: 'relative',
        margin: -16,
        padding: 16,
      }}
    >
      <Button onClick={onOpen}>Open</Button>
      <SwQrScanner
        {...args}
        id={modalId}
        getContainer='#scanner-container'
        overlay={overlay}
        footer={footer}
        isError={isError}
        onSuccess={onSuccess}
        onError={console.log}
        onClose={onClose}
      />
    </div>
  );
};

export default {
  title: 'Qr/SwQrScanner',
  component: Wrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    isError: {
      control: false,
    },
    multipleFrame: {
      control: false,
    },
    type: {
      options: ['zxing', 'jsqr'],
      control: 'radio',
      defaultValue: 'jsqr',
    },
  },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

const DEFAULT_ARGS = {
  title: 'Custom title',
  description: 'Custom description',
  type: 'jsqr',
};

export const Default = Template.bind({});

Default.args = {
  ...DEFAULT_ARGS,
  isError: false,
  multipleFrame: false,
};

export const WithError = Template.bind({});

WithError.args = {
  ...DEFAULT_ARGS,
  isError: true,
  multipleFrame: false,
};

export const MultipleFrame = Template.bind({});

MultipleFrame.args = {
  ...DEFAULT_ARGS,
  isError: false,
  multipleFrame: true,
};
