import classNames from 'classnames';
import RcImage, { type ImageProps } from 'rc-image';
import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import Squircle from '../squircle/index';
import { ConfigContext } from '../config-provider';
// CSSINJS
import useStyle from './style';
import defaultLocale from '../locale/en_US';
import { getTransitionName } from '../_util/motion';
import PreviewGroup, { icons } from './PreviewGroup';

const ImageShapes = ['default', 'square', 'rounded', 'circle', 'squircle'] as const;
export type ImageShape = typeof ImageShapes[number];

export interface SwImageProps extends ImageProps {
  shape?: ImageShape;
  width: string;
  height?: string;
  responsive?: boolean;
}

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

const Image: CompositionImage<SwImageProps> = ({
  prefixCls: customizePrefixCls,
  preview,
  rootClassName,
  shape = 'default',
  width,
  height = 'auto',
  responsive,
  ...otherProps
}) => {
  const {
    getPrefixCls,
    locale: contextLocale = defaultLocale,
    getPopupContainer: getContextPopupContainer,
  } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const imageLocale = contextLocale.Image || defaultLocale.Image;
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedRootClassName = classNames(rootClassName, hashId, {
    [`-shape-${shape}`]: shape !== 'default' && shape,
    '-responsive': !!responsive,
  });

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const { getContainer, ...restPreviewProps } = _preview;
    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      ),
      icons,
      ...restPreviewProps,
      getContainer: getContainer || getContextPopupContainer,
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
    };
  }, [preview, imageLocale]);
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
      preview={mergedPreview}
      prefixCls={`${prefixCls}`}
      rootClassName={mergedRootClassName}
      {...otherProps}
    />,
  );
};

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

export default Image;
