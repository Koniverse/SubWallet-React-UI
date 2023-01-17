import * as React from 'react';
import classNames from 'classnames';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import Image from '../../image';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Divider from '../../divider';

export interface DappItemProps extends Web3BlockProps {
  dAppName: string;
  src?: string;
  dAppTag?: React.ReactNode;
  dAppTitle?: string;
}

const DappItem: React.FC<DappItemProps> = ({
  dAppName,
  src,
  dAppTag,
  dAppTitle,
  leftItem,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('dapp-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <div className={classes}>
      <Web3Block
        {...props}
        className={`${prefixCls}-content-wrapper`}
        leftItem={
          leftItem || <Image shape="squircle" src={src} width={40} height={40} preview={false} />
        }
        middleItem={
          middleItem || (
            <>
              <div className={`${prefixCls}-name-wrapper`}>
                <div className={`${prefixCls}-name`}>{dAppName}</div>
                {dAppTag}
              </div>
              <div className={`${prefixCls}-title`}>{dAppTitle}</div>
            </>
          )
        }
        rightItem={rightItem}
      />
      <div className={`${prefixCls}-divider`}>
        <Divider />
      </div>
    </div>,
  );
};

export default DappItem;
