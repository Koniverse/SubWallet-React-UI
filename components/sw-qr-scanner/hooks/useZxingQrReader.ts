import { useEffect, useRef } from 'react';
import type { IScannerControls } from '@zxing/browser';
import { BrowserQRCodeReader } from '@zxing/browser';
import { noop } from '../../_util/dom';
import type { OnResultFunction, UseZxingQrReaderHook } from '../types';

import { isMediaDevicesSupported, isValidType } from '../utils';

const stopController = (control?: IScannerControls) => {
  control?.stop();
};

let streamList: Array<IScannerControls> = [];

// TODO: add support for debug logs
const useZxingQrReader: UseZxingQrReaderHook = ({
  scanDelay: delayBetweenScanAttempts,
  constraints: video,
  onResult,
  videoId,
  setLoading,
}): void => {
  const handlerRef = useRef<OnResultFunction>(noop);

  useEffect(() => {
    setLoading(true);
    const codeReader = new BrowserQRCodeReader(undefined, {
      delayBetweenScanAttempts,
    });

    if (!isMediaDevicesSupported() && isValidType(handlerRef.current, 'onResult', 'function')) {
      const message =
        'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';

      handlerRef.current(null, new Error(message), codeReader);
    }

    if (isValidType(video, 'constraints', 'object')) {
      codeReader
        .decodeFromConstraints({ video }, videoId, (result, error) => {
          if (isValidType(handlerRef.current, 'onResult', 'function')) {
            handlerRef.current(result, error, codeReader);
          }
        })
        .then((value: IScannerControls) => {
          setLoading(false);
          streamList.push(value);
        })
        .catch((error: Error) => {
          if (isValidType(handlerRef.current, 'onResult', 'function')) {
            handlerRef.current(null, error, codeReader);
          }
        });
    }

    return () => {
      streamList.forEach((s) => {
        stopController(s);
      });

      streamList = [];
    };
  }, [delayBetweenScanAttempts, video, videoId, setLoading]);

  useEffect(() => {
    handlerRef.current = onResult;
  }, [onResult]);
};

export default useZxingQrReader;
