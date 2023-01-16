import React from 'react';
import classNames from 'classnames';
import type { FlatListProps } from 'flatlist-react';
import FlatList from 'flatlist-react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface SwListProps<T = any> extends FlatListProps<T> {
  prefixCls?: string;
  className?: string;
}

function SwList(props: SwListProps) {
  const {
    prefixCls: customizePrefixCls = '',
    className,
    displayGrid,
    displayRow,
    renderOnScroll = true,
    ...baseFlatListProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('sw-list', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(customizePrefixCls);
  const classes = classNames(prefixCls, hashId, className, {
    '-display-grid': displayGrid,
    '-display-row': displayRow,
    '-render-on-scroll': renderOnScroll,
    '-render-default': !renderOnScroll,
  });

  return wrapSSR(
    <div className={`${classes}`}>
      <FlatList
        {...baseFlatListProps}
        renderOnScroll={renderOnScroll}
        displayGrid={displayGrid}
        displayRow={displayRow}
      />
    </div>,
  );
}

export default SwList;
