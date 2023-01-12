import classNames from 'classnames';
import React, { useRef } from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import useQrReader from './hooks/useQrReader';

import type { QrReaderProps } from './types';

const QrReader: React.FC<QrReaderProps> = ({
  videoContainerStyle,
  containerStyle,
  videoStyle,
  constraints,
  ViewFinder,
  scanDelay,
  className,
  onResult,
  videoId,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const _prefixCls = getPrefixCls('sw-qr-scanner');
  const prefixCls = `${_prefixCls}-reader`;
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useQrReader({
    constraints,
    scanDelay,
    onResult,
    videoId,
  });

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

QrReader.displayName = 'QrReader';
QrReader.defaultProps = {
  constraints: {
    facingMode: 'user',
  },
  videoId: 'video',
  scanDelay: 500,
};

export default QrReader;
