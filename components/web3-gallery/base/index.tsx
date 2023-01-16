import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import type { PresetBarShapeType } from '../../_util/shapes';
import useStyle from './style';

export interface Web3GalleryProps {
  imageSource?: string;
  imageAlt?: string;
  customImageNode?: React.ReactNode;
  footerNode?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  shape?: Exclude<PresetBarShapeType, 'round'>; // 'default' | 'square'
  appendNode?: React.ReactNode;
}

const Web3Gallery: React.FC<Web3GalleryProps> = ({
  imageSource,
  customImageNode,
  shape = 'default',
  footerNode,
  onClick,
  className,
  imageAlt = 'Image',
  appendNode,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('web3-gallery');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, className, hashId, {
    [`-shape-${shape}`]: !!shape,
  });

  return wrapSSR(
    <div className={classes} onClick={onClick}>
      <div className="__image-wrapper">
        {!customImageNode && imageSource && (
          <div className="__image">
            <img src={imageSource} alt={imageAlt} />
          </div>
        )}
        {customImageNode && <div className="__image">{customImageNode}</div>}
      </div>
      {!!footerNode && <div className="__footer-wrapper">{footerNode}</div>}
      {appendNode}
    </div>,
  );
};

export default Web3Gallery;
