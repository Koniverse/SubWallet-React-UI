import EyeOutlined from '@ant-design/icons/EyeOutlined';
import classNames from 'classnames';
import RcImage, { type ImageProps } from 'rc-image';
import type { SyntheticEvent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { ConfigContext } from '../config-provider';
import Squircle from '../squircle/index';
// CSSINJS
import ActivityIndicator from '../activity-indicator';
import defaultLocale from '../locale/en_US';
import { FAULT_TOLERANT } from '../_util/constant';
import { formatPxNumbers } from '../_util/dimension';
import { getTransitionName } from '../_util/motion';
import PreviewGroup, { icons } from './PreviewGroup';
import useStyle from './style';

const ImageShapes = ['default', 'square', 'circle', 'squircle', 'none'] as const;
export type ImageShape = typeof ImageShapes[number];

type ModelViewerProps = Record<string, any>;

export interface SwImageProps extends ImageProps {
  shape?: ImageShape;
  width?: string | number;
  height?: string | number;
  responsive?: boolean;
  isLoading?: boolean;
  activityIndicatorSize?: number | string;
  modelViewerProps?: ModelViewerProps; // will remove after
  fallbackSrc?: string;
}

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

const Image: CompositionImage<SwImageProps> = ({
  prefixCls: customizePrefixCls,
  preview = false,
  rootClassName,
  shape = 'default',
  width = 'auto',
  height = 'auto',
  responsive,
 fallbackSrc,
  isLoading,
  activityIndicatorSize = 16,
  modelViewerProps,
  onLoad,
  onError,
  src,
  ...otherProps
}) => {
  const {
    getPrefixCls,
    locale: contextLocale = defaultLocale,
    getPopupContainer: getContextPopupContainer,
  } = React.useContext(ConfigContext);

  [width, height] = formatPxNumbers([width, height]);

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const imageLocale = contextLocale.Image || defaultLocale.Image;

  const [showImage, setShowImage] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

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
  }, [preview, prefixCls, imageLocale?.preview, getContextPopupContainer, rootPrefixCls]);

  const handleOnLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      onLoad?.(event);
    },
    [onLoad],
  );

  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setShowImage(false);
      setShowVideo(true);
      onError?.(event);
    },
    [onError],
  );

  const handleVideoError = useCallback(() => {
    setShowVideo(false);
  }, []);

  useEffect(() => {
    setShowImage(true);
    setShowVideo(false);
  }, [src]);

  const renderImage = () => {
    if (showImage) {
      return (
        <RcImage
          style={{ width, height }}
          preview={mergedPreview}
          prefixCls={`${prefixCls}`}
          rootClassName={mergedRootClassName}
          fallback={FAULT_TOLERANT}
          onLoad={handleOnLoad}
          onError={handleImageError}
          src={src}
          {...otherProps}
        />
      );
    }

    if (showVideo) {
      return (
        <div className={classNames(prefixCls, mergedRootClassName)}>
          <div className={classNames(`${prefixCls}-video-container`)}>
            <video
              className={classNames(`${prefixCls}-video`)}
              autoPlay
              width={width}
              height={height}
              loop
              muted
              onError={handleVideoError}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        </div>
      );
    }

    return (
      <RcImage
        style={{ width, height }}
        preview={false}
        prefixCls={`${prefixCls}`}
        rootClassName={mergedRootClassName}
        fallback={fallbackSrc || FAULT_TOLERANT}
        onLoad={handleOnLoad}
        onError={handleImageError}
        src={fallbackSrc || FAULT_TOLERANT}
        {...otherProps}
      />
    );
  };

  if (shape === 'squircle') {
    if (isLoading) {
      return wrapSSR(
        <Squircle customSize={width}>
          <div className={`${prefixCls} ${mergedRootClassName}`}>
            <div className={`${prefixCls}-img __loading-wrapper`} style={{ width, height: width }}>
              <ActivityIndicator prefixCls={prefixCls} size={activityIndicatorSize} existIcon />
            </div>
          </div>
        </Squircle>,
      );
    }

    return wrapSSR(<Squircle customSize={width}>{renderImage()}</Squircle>);
  }

  if (isLoading) {
    return wrapSSR(
      <div className={`${prefixCls} ${mergedRootClassName}`}>
        <div
          className={`${prefixCls}-img __loading-wrapper`}
          style={{ width, height: shape === 'circle' ? width : height }}
        >
          <ActivityIndicator prefixCls={prefixCls} size={activityIndicatorSize} existIcon />
        </div>
      </div>,
    );
  }

  return wrapSSR(<>{renderImage()}</>);
};

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

export default Image;
