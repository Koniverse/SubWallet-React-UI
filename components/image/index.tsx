import '@google/model-viewer';
import classNames from 'classnames';
import RcImage, { type ImageProps } from 'rc-image';
import * as React from 'react';
import type { SyntheticEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import Squircle from '../squircle/index';
import { ConfigContext } from '../config-provider';
// CSSINJS
import useStyle from './style';
import defaultLocale from '../locale/en_US';
import { getTransitionName } from '../_util/motion';
import PreviewGroup, { icons } from './PreviewGroup';
import ActivityIndicator from '../activity-indicator';
import { FAULT_TOLERANT } from '../_util/constant';
import { formatPxNumbers } from '../_util/dimension';

const ImageShapes = ['default', 'square', 'circle', 'squircle', 'none'] as const;
export type ImageShape = typeof ImageShapes[number];

export interface SwImageProps extends ImageProps {
  shape?: ImageShape;
  width?: string | number;
  height?: string | number;
  responsive?: boolean;
  isLoading?: boolean;
  activityIndicatorSize?: number | string;
  isShow3dModel?: boolean;
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
  isLoading,
  activityIndicatorSize = 16,
  isShow3dModel = true,
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
  const [show3dViewer, setShow3dViewer] = useState(false);

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
    setShow3dViewer(true);
  }, []);

  useEffect(() => {
    setShowImage(true);
    setShowVideo(false);
    setShow3dViewer(false);
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
        <video autoPlay height='124' loop muted onError={handleVideoError} width='124'>
          <source src={src} type='video/mp4' />
        </video>
      );
    }

    if (show3dViewer && isShow3dModel) {
      return (
        <div style={{ width, height, display: 'grid' }}>
          {/* @ts-ignore */}
          <model-viewer
            className={classNames(`${prefixCls}-3d-modal-viewer`)}
            alt="model-viewer"
            ar-status="not-presenting"
            auto-rotate="true"
            auto-rotate-delay={100}
            bounds="tight"
            disable-pan="true"
            disable-scroll="true"
            disable-tap="true"
            disable-zoom="true"
            environment-image="neutral"
            interaction-prompt="none"
            loading="eager"
            src={src}
            touch-action="none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      );
    }

    return (
      <RcImage
        style={{ width, height }}
        preview={false}
        prefixCls={`${prefixCls}`}
        rootClassName={mergedRootClassName}
        fallback={FAULT_TOLERANT}
        onLoad={handleOnLoad}
        onError={handleImageError}
        src={FAULT_TOLERANT}
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
