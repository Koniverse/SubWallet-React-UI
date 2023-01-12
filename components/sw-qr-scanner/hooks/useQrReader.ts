import { useEffect } from 'react';
import type { IScannerControls } from '@zxing/browser';
import { BrowserQRCodeReader } from '@zxing/browser';

import type { UseQrReaderHook } from '../types';

import { isMediaDevicesSupported, isValidType } from '../utils';

const stopController = (control?: IScannerControls) => {
  control?.stop();
};

let streamList: Array<IScannerControls> = [];

// TODO: add support for debug logs
const useQrReader: UseQrReaderHook = ({
  scanDelay: delayBetweenScanAttempts,
  constraints: video,
  onResult,
  videoId,
}): void => {
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader(undefined, {
      delayBetweenScanAttempts,
    });

    if (!isMediaDevicesSupported() && isValidType(onResult, 'onResult', 'function')) {
      const message =
        'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';

      onResult(null, new Error(message), codeReader);
    }

    if (isValidType(video, 'constraints', 'object')) {
      codeReader
        .decodeFromConstraints({ video }, videoId, (result, error) => {
          if (isValidType(onResult, 'onResult', 'function')) {
            onResult(result, error, codeReader);
          }
        })
        .then((value: IScannerControls) => {
          streamList.push(value);
        })
        .catch((error: Error) => {
          if (isValidType(onResult, 'onResult', 'function')) {
            onResult(null, error, codeReader);
          }
        });
    }

    return () => {
      streamList.forEach((s) => {
        stopController(s);
      });

      streamList = [];
    };
  }, [delayBetweenScanAttempts, onResult, video, videoId]);
};

export default useQrReader;
