import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import SwQrScanner from '../index';
import type { ScannerResult, SwQrScannerProps } from '../index';
import Button from '../../button';
import Icon from '../../icon';
import Progress from '../../progress';

interface WrapperProps extends SwQrScannerProps {
  multipleFrame: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ isError, multipleFrame, ...args }) => {
  const [open, setOpen] = useState(true);
  const [result, setResult] = useState('');

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
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
    <div>
      <Button onClick={onOpen}>Open</Button>
      <SwQrScanner
        {...args}
        overlay={overlay}
        footer={footer}
        isError={isError}
        open={open}
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
    isError: {
      type: 'boolean',
    },
    multipleFrame: {
      type: 'boolean',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  isError: false,
  multipleFrame: false,
  title: 'Custom title',
  description: 'Custom description',
};
