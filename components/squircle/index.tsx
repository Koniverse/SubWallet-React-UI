import * as React from 'react';
import SuperEllipse from 'react-superellipse';
import { ConfigContext } from 'antd/es/config-provider';
import classNames from 'classnames';
import useStyle from './style';

export interface SquircleProps {
  prefixCls?: string;
  size?: number;
  className?: string;
  children?: React.ReactElement;
  backgroundColor?: string;
}

const Squircle: React.FC<SquircleProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    size: customSize,
    className,
    children,
    backgroundColor = '#004BFF',
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('squircle', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, className);

  return wrapSSR(
    <SuperEllipse
      className={classes}
      style={{ width: `${customSize}px`, height: `${customSize}px`, backgroundColor }}
      r1={0.128}
      r2={0.5}
    >
      {children}
    </SuperEllipse>,
  );
};

export default Squircle;
