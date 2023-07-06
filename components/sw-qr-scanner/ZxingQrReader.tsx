import classNames from 'classnames';
import React from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import useZxingQrReader from './hooks/useZxingQrReader';

import type { QrReaderProps } from './types';

const ZxingQrReader: React.FC<QrReaderProps> = ({
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

  useZxingQrReader({
    constraints,
    scanDelay,
    onResult,
    videoId,
    setLoading,
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

ZxingQrReader.displayName = 'QrReader';
ZxingQrReader.defaultProps = {
  constraints: {
    facingMode: 'user',
  },
  videoId: 'video',
  scanDelay: 500,
};

export default ZxingQrReader;
