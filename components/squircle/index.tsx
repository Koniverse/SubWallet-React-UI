import * as React from 'react';
import SuperEllipse from 'react-superellipse';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { SizeType } from '../config-provider/SizeContext';
import { sizeNameMap } from '../config-provider/SizeContext';
import { formatPxNumber } from '../_util/dimension';

export interface SquircleProps {
  prefixCls?: string;
  size?: SizeType;
  customSize?: string | number;
  className?: string;
  children?: React.ReactElement;
  fill?: string;
  inline?: boolean;
}

function getStyle(customSize?: string | number, fill?: string): CSSProperties | undefined {
  if (!customSize && !fill) {
    return undefined;
  }

  if (customSize) {
    customSize = formatPxNumber(customSize);
  }

  const style: CSSProperties = {};

  if (customSize) {
    style.width = customSize;
    style.height = customSize;
  }

  if (fill) {
    style.backgroundColor = fill;
  }

  return style;
}

const Squircle: React.FC<SquircleProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    size,
    customSize,
    className,
    children,
    fill,
    inline,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('squircle', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const sizeCls = size ? sizeNameMap[size] || '' : '';
  const classes = classNames(prefixCls, hashId, className, {
    [`-size-${sizeCls}`]: !!sizeCls,
    '-inline': !!inline,
  });

  const _style = useMemo<CSSProperties | undefined>(
    () => getStyle(customSize, fill),
    [customSize, fill],
  );

  return wrapSSR(
    <SuperEllipse className={classes} style={_style} r1={0.128} r2={0.5}>
      {children}
    </SuperEllipse>,
  );
};

export default Squircle;
