import * as React from 'react';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import SwList from './List';
import type { SwListProps } from './List';
import Input from '../input';

export interface SwListSectionProps<T> extends Omit<SwListProps<T>, 'searchBy' | 'searchTerm'> {
  listClassName?: string;
  searchFunction?: (item: T, searchText: string) => boolean;
  enableSearchInput?: boolean;
  searchPlaceholder?: string;
  height?: string;
  list: SwListProps<T>['list'];
  renderItem: SwListProps<T>['renderItem'];
}

const SwListSection = <T extends any>(props: SwListSectionProps<T>) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    searchFunction,
    searchPlaceholder,
    height,
    enableSearchInput,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const basePrefixCls = getPrefixCls('sw-list', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(basePrefixCls);
  const classes = classNames(`${basePrefixCls}-section`, hashId, className);
  const [searchText, setSearchText] = useState<string>('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const searchBy = useCallback(
    (item: T) => (searchFunction ? searchFunction(item, searchText) : true),
    [searchFunction, searchText],
  );

  return wrapSSR(
    <div className={classes} style={{ height }}>
      {enableSearchInput && (
        <div className={`${basePrefixCls}-search-input`}>
          <Input.Search onChange={onChange} placeholder={searchPlaceholder} value={searchText} />
        </div>
      )}
      <div className={`${basePrefixCls}-wrapper`}>
        <SwList
          {...restProps}
          prefixCls={customizePrefixCls}
          searchBy={searchBy}
          searchTerm={searchText}
        />
      </div>
    </div>,
  );
};

export default SwListSection;
