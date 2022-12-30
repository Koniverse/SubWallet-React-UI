import classNames from 'classnames';
import RcImage, { type ImageProps } from 'rc-image';
import * as React from 'react';
import Squircle from '../squircle/index';
import { ConfigContext } from '../config-provider';
// CSSINJS
import useStyle from './style';

const ImageShapes = ['default', 'square', 'rounded', 'circle', 'squircle'] as const;
export type ImageShape = typeof ImageShapes[number];

export interface SwImageProps extends ImageProps {
  shape?: ImageShape;
  width: string;
  height?: string;
  responsive?: boolean;
}

const Image: React.FC<SwImageProps> = ({
  prefixCls: customizePrefixCls,
  preview,
  rootClassName,
  shape = 'default',
  width,
  height = 'auto',
  responsive,
  ...otherProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedRootClassName = classNames(rootClassName, hashId, {
    [`-shape-${shape}`]: shape !== 'default' && shape,
    '-responsive': !!responsive,
  });
  if (shape === 'squircle') {
    return wrapSSR(
      <Squircle customSize={width}>
        <RcImage
          style={{ width, height }}
          preview={false}
          prefixCls={`${prefixCls}`}
          rootClassName={mergedRootClassName}
          {...otherProps}
        />
      </Squircle>,
    );
  }

  return wrapSSR(
    <RcImage
      style={{ width, height: shape === 'circle' ? width : height }}
      preview={false}
      prefixCls={`${prefixCls}`}
      rootClassName={mergedRootClassName}
      {...otherProps}
    />,
  );
};

export { ImageProps };

export default Image;
