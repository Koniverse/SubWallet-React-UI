import React from 'react';
import classNames from 'classnames';
import type { FlatListProps } from 'flatlist-react';
import FlatList from 'flatlist-react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import LoadingIcon from '../button/LoadingIcon';

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
    paginationLoadingIndicator,
    paginationLoadingIndicatorPosition = 'center',
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

  const defaultLoadingIcon = <LoadingIcon existIcon={false} prefixCls={prefixCls} loading />;

  return wrapSSR(
    <div className={`${classes}`}>
      <FlatList
        {...baseFlatListProps}
        renderOnScroll={renderOnScroll}
        displayGrid={displayGrid}
        displayRow={displayRow}
        paginationLoadingIndicator={paginationLoadingIndicator || defaultLoadingIcon}
        paginationLoadingIndicatorPosition={paginationLoadingIndicatorPosition}
      />
    </div>,
  );
}

export default SwList;
