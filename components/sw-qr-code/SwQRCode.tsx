import type { CSSProperties } from 'react';
import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ReloadOutlined } from '@ant-design/icons';
import type { IProps } from 'react-qrcode-logo';
import { QRCode } from 'react-qrcode-logo';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import Spin from '../spin';
import Button from '../button';

const defaultIcon = require('./QrCodeIcon.png');

interface QRProps {
  value: string;
  size?: number;
  errorLevel?: IProps['ecLevel'];
  status?: 'active' | 'expired' | 'loading';
  color?: string;
  bgColor?: string;
  outerEyesRadius?: number;
  innerEyesRadius?: number;
  logoPadding?: number;
}

export interface SwQRCodeProps extends QRProps {
  className?: string;
  prefixCls?: string;
  icon?: string;
  onRefresh?: () => void;
  style?: CSSProperties;
  border?: number;
}

const SwQRCode: React.FC<SwQRCodeProps> = (props: SwQRCodeProps) => {
  const {
    value,
    icon = defaultIcon,
    size = 300,
    errorLevel = 'Q',
    status = 'active',
    onRefresh,
    style,
    className,
    prefixCls: customizePrefixCls,
    color = '#000',
    bgColor = '#fff',
    outerEyesRadius = 20,
    innerEyesRadius = 9,
    logoPadding = 6,
  } = props;

  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('sw-qr-code', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const containerClassName = useMemo(
    () => classNames(hashId, className, prefixCls),
    [hashId, className, prefixCls],
  );
  const borderSize = size * 0.05;
  const qrSize = size - size * 0.05 * 2;
  const logoSize = size * 0.32;

  return wrapSSR(
    <div style={{ ...style, width: size, height: size }} className={containerClassName}>
      {status !== 'active' && (
        <div className={`${prefixCls}-mask`}>
          {status === 'loading' && <Spin />}
          {status === 'expired' && (
            <>
              <div className={`${prefixCls}-expired`}>QR code expired</div>
              {typeof onRefresh === 'function' && (
                <Button type='link' icon={<ReloadOutlined />} onClick={onRefresh}>
                  Refresh
                </Button>
              )}
            </>
          )}
        </div>
      )}
      <QRCode
        value={value}
        ecLevel={errorLevel}
        logoImage={icon}
        size={qrSize}
        quietZone={borderSize}
        qrStyle='dots'
        removeQrCodeBehindLogo
        eyeRadius={[
          {
            inner: innerEyesRadius,
            outer: [outerEyesRadius, outerEyesRadius, 0, outerEyesRadius],
          },
          {
            outer: [outerEyesRadius, outerEyesRadius, outerEyesRadius, 0],
            inner: innerEyesRadius,
          },
          {
            outer: [outerEyesRadius, 0, outerEyesRadius, outerEyesRadius],
            inner: innerEyesRadius,
          },
        ]}
        logoWidth={logoSize}
        logoPadding={logoPadding}
        fgColor={color}
        bgColor={bgColor}
      />
    </div>,
  );
};

export default SwQRCode;
