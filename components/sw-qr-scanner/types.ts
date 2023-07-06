import type { BrowserQRCodeReader } from '@zxing/browser';
import type { Result as ZxingResult } from '@zxing/library';
import type { QRCode as JsQrResult } from 'jsqr';
import { ChangeEventHandler } from 'react';
import type React from 'react';

export type QrDecodeLib = 'zxing' | 'jsqr';

export type QrReaderProps = {
  /**
   * Media track constraints object, to specify which camera and capabilities to use
   */
  constraints?: MediaTrackConstraints;
  /**
   * Called when an error occurs.
   */
  onResult: OnResultFunction;
  /**
   * Property that represents the view finder component
   */
  ViewFinder?: (props: any) => React.ReactElement<any, any> | null;
  /**
   * Property that represents the scan period
   */
  scanDelay?: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;
  /**
   * Property that represents an optional className to modify styles
   */
  className?: string;
  /**
   * Property that represents a style for the container
   */
  containerStyle?: any;
  /**
   * Property that represents a style for the video container
   */
  videoContainerStyle?: any;
  /**
   * Property that represents a style for the video
   */
  videoStyle?: any;
  setLoading: (value: boolean) => void;
};

export type OnResultFunction = (
  /**
   * The QR values extracted by Zxing or JsQR
   */
  result?: ZxingResult | JsQrResult | undefined | null,
  /**
   * The name of the exceptions thrown while reading the QR
   */
  error?: Error | undefined | null,
  /**
   * The instance of the QR browser reader
   */
  codeReader?: BrowserQRCodeReader,
) => void;

export type UseQrReaderHookProps = {
  /**
   * Media constraints object, to specify which camera and capabilities to use
   */
  constraints?: MediaTrackConstraints;
  /**
   * Callback for retrieving the result
   */
  onResult: OnResultFunction;
  /**
   * Property that represents the scan period
   */
  scanDelay?: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;

  setLoading: (value: boolean) => void;
};

export type UseZxingQrReaderHook = (props: UseQrReaderHookProps) => void;

export interface SelectQrImageHookProps {
  onResult: OnResultFunction;
  type: QrDecodeLib;
}

export interface SelectQrImageHookResult {
  imageLoading: boolean;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
}

export type UseSelectQrImageHook = (props: SelectQrImageHookProps) => SelectQrImageHookResult;
