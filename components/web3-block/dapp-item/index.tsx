import * as React from 'react';
import classNames from 'classnames';
import Web3Block from '../base';
import Image from '../../image';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import Divider from '../../divider';

export interface DappItemProps {
  dAppName: string;
  src?: string;
  dAppTag?: React.ReactNode;
  dAppTitle?: string;
  rightItem?: React.ReactNode;
}

const DappItem: React.FC<DappItemProps> = ({ dAppName, src, dAppTag, dAppTitle, rightItem }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('dapp-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);
  const getLeftItem = () => (
    <Image shape="squircle" src={src} width={40} height={40} preview={false} />
  );

  const getMiddleItem = () => (
    <>
      <div className={`${prefixCls}-name-wrapper`}>
        <div className={`${prefixCls}-name`}>{dAppName}</div>
        {dAppTag}
      </div>
      <div className={`${prefixCls}-title`}>{dAppTitle}</div>
    </>
  );

  return wrapSSR(
    <div className={classes}>
      <Web3Block
        className={`${prefixCls}-content-wrapper`}
        leftItem={getLeftItem()}
        middleItem={getMiddleItem()}
        rightItem={rightItem}
      />
      <div className={`${prefixCls}-divider`}>
        <Divider />
      </div>
    </div>,
  );
};

export default DappItem;
