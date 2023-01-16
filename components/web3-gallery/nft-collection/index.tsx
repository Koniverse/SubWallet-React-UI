import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import type { Web3GalleryProps } from '../base';
import Web3Gallery from '../base';

export interface NftCollectionProps extends Omit<Web3GalleryProps, 'footerNode' | 'appendNode'> {
  title: string;
  count: number;
}

const NftCollection: React.FC<NftCollectionProps> = ({ className, title, count, ...restProps }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('nft-collection');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, className, hashId);

  return wrapSSR(
    <Web3Gallery
      {...restProps}
      className={classes}
      footerNode={
        <>
          <div className="__footer-left">
            <div className="__collection-title">{title}</div>
          </div>
          <div className="__footer-right">
            <div className="__collection-count">{count}</div>
          </div>
        </>
      }
    />,
  );
};

export default NftCollection;
