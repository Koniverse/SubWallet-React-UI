import React, { useMemo, useContext } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import classNames from 'classnames';
import { ReloadOutlined } from '@ant-design/icons';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale/LocaleReceiver';
import type { ConfigConsumerProps } from '../config-provider';
import type { QRCodeProps, QRPropsCanvas } from './interface';
import warning from '../_util/warning';
import useStyle from './style/index';
import Spin from '../spin';
import Button from '../button';

const defaultIcon = require('./QrCodeIcon.png');

const QRCode: React.FC<QRCodeProps> = (props) => {
  const {
    value,
    icon = defaultIcon,
    size = 160,
    color = '#000',
    errorLevel = 'M',
    status = 'active',
    onRefresh,
    style,
    className,
    prefixCls: customizePrefixCls,
  } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const qrCodeBorder = size * 0.05;
  const iconSize = size * 0.32;
  const qrCodeProps = useMemo<QRPropsCanvas>(() => {
    const imageSettings: QRCodeProps['imageSettings'] = {
      src: icon,
      x: undefined,
      y: undefined,
      height: iconSize,
      width: iconSize,
      excavate: true,
    };
    return {
      value,
      size: size - qrCodeBorder * 2,
      level: errorLevel,
      bgColor: 'transparent',
      fgColor: color,
      imageSettings: icon ? imageSettings : undefined,
    };
  }, [errorLevel, color, icon, iconSize, size, value]);

  if (!value) {
    if (process.env.NODE_ENV !== 'production') {
      warning(false, 'QRCode', 'need to receive `value` props');
    }
    return null;
  }

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !(icon && errorLevel === 'L'),
      'QRCode',
      'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.',
    );
  }

  const cls = classNames(prefixCls, className, hashId);

  return wrapSSR(
    <LocaleReceiver componentName="QRCode">
      {(locale) => (
        <div style={{ ...style, width: size, height: size, padding: qrCodeBorder }} className={cls}>
          {status !== 'active' && (
            <div className={`${prefixCls}-mask`}>
              {status === 'loading' && <Spin />}
              {status === 'expired' && (
                <>
                  <div className={`${prefixCls}-expired`}>{locale.expired}</div>
                  {typeof onRefresh === 'function' && (
                    <Button type="link" icon={<ReloadOutlined />} onClick={onRefresh}>
                      {locale.refresh}
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
          <QRCodeCanvas {...qrCodeProps} />
        </div>
      )}
    </LocaleReceiver>,
  );
};

export default QRCode;
