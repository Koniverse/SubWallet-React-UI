import classNames from 'classnames';
import type { QRCode as JsQrResult } from 'jsqr';
import jsQR from 'jsqr';
import React, { useCallback, useEffect, useRef } from 'react';
import { noop } from '../_util/dom';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

import type { OnResultFunction, QrReaderProps } from './types';

const JsQrReader: React.FC<QrReaderProps> = ({
  videoContainerStyle,
  containerStyle,
  videoStyle,
  constraints,
  ViewFinder,
  scanDelay,
  className,
  onResult,
  videoId,
  setLoading,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const _prefixCls = getPrefixCls('sw-qr-scanner');
  const prefixCls = `${_prefixCls}-reader`;
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeOutRef = useRef<NodeJS.Timer | null>(null);
  const stopRef = useRef<VoidFunction>(noop);
  const scanFuncRef = useRef<VoidFunction>(noop);
  const handlerRef = useRef<OnResultFunction>(noop);

  // useZxingQrReader({
  //   constraints,
  //   scanDelay,
  //   onResult,
  //   videoId,
  //   setLoading,
  // });

  const createTimeOut = useCallback(
    (func: VoidFunction) => {
      clearTimeout(timeOutRef.current as unknown as number);

      timeOutRef.current = setTimeout(func, scanDelay);
    },
    [scanDelay],
  );

  const onPostResult = useCallback(
    (data: JsQrResult | null) => {
      if (data) {
        handlerRef.current(data, null);
      }

      createTimeOut(scanFuncRef.current);
    },
    [createTimeOut],
  );

  const onCheck = useCallback(() => {
    const check = () => {
      const preview = videoRef.current!;
      const canvas = document.createElement('canvas');

      // Get image/video dimensions
      const width = Math.floor(preview.videoWidth);
      const height = Math.floor(preview.videoHeight);

      canvas.width = width;
      canvas.height = height;

      const previewIsPlaying = preview && preview.readyState === preview.HAVE_ENOUGH_DATA;

      if (previewIsPlaying) {
        const ctx = canvas.getContext('2d')!;

        ctx.drawImage(preview, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // // Send data to web-worker
        // this.worker.postMessage(imageData)

        const qr = jsQR(imageData.data, width, height);
        onPostResult(qr);
      } else {
        setTimeout(check, scanDelay);
      }
    };

    scanFuncRef.current = check;
    check();
  }, [onPostResult, scanDelay]);

  const handleLoadStart = useCallback(() => {
    const preview = videoRef.current!;
    preview.play();

    createTimeOut(onCheck);
  }, [createTimeOut, onCheck]);

  useEffect(() => {
    setLoading(true);

    const preview = videoRef.current;

    const handleVideo = () => {
      const _preview = videoRef.current!;

      navigator.mediaDevices
        .getUserMedia({
          ...(constraints?.deviceId
            ? { video: { deviceId: constraints.deviceId } }
            : { video: true }),
        })
        .then((stream) => {
          if ((_preview || {}).srcObject !== undefined) {
            _preview.srcObject = stream;
            // @ts-ignore
          } else if (_preview.mozSrcObject !== undefined) {
            // @ts-ignore
            _preview.mozSrcObject = stream;
          } else if (window.URL.createObjectURL) {
            // @ts-ignore
            _preview.src = window.URL.createObjectURL(stream);
          } else if (window.webkitURL) {
            // @ts-ignore
            _preview.src = window.webkitURL.createObjectURL(stream);
          } else {
            // @ts-ignore
            _preview.src = stream;
          }

          _preview.playsInline = true;

          stopRef.current = () => {
            stream.getTracks().forEach((track) => {
              track.stop();
            });
          };

          const handleStart = () => {
            handleLoadStart();
            _preview.removeEventListener('loadstart', handleStart);
          };

          // IOS play in fullscreen
          _preview.addEventListener('loadstart', handleStart);
        })
        .catch((e: Error) => {
          handlerRef.current(null, e);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (preview) {
      handleVideo();
    } else {
      setTimeout(handleVideo, 200);
    }

    return () => {
      stopRef.current();
      clearTimeout(timeOutRef.current as unknown as number);
    };
  }, [constraints, handleLoadStart, setLoading]);

  useEffect(() => {
    handlerRef.current = onResult;
  }, [onResult]);

  return wrapSSR(
    <section
      className={classNames(className, hashId, `${prefixCls}-wrapper`)}
      style={containerStyle}
    >
      <div
        className={classNames(`${prefixCls}-container`)}
        style={{
          ...videoContainerStyle,
        }}
      >
        {!!ViewFinder && <ViewFinder />}
        <video
          muted
          id={videoId}
          ref={videoRef}
          className={classNames(`${prefixCls}-video`)}
          style={{
            ...videoStyle,
            transform: constraints?.facingMode === 'user' && 'scaleX(-1)',
          }}
        />
      </div>
    </section>,
  );
};

JsQrReader.displayName = 'QrReader';
JsQrReader.defaultProps = {
  constraints: {
    facingMode: 'user',
  },
  videoId: 'video',
  scanDelay: 500,
};

export default JsQrReader;
