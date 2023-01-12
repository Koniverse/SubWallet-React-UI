import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import type { Web3GalleryProps } from '../base';
import Web3Gallery from '../base';

export interface NftItemProps extends Omit<Web3GalleryProps, 'footerNode' | 'appendNode'> {
  title: string;
}

const NftItem: React.FC<NftItemProps> = ({ className, title, ...restProps }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('nft-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, className, hashId);

  return wrapSSR(
    <Web3Gallery
      {...restProps}
      className={classes}
      footerNode={<div className="__item-title">{title}</div>}
    />,
  );
};

export default NftItem;
