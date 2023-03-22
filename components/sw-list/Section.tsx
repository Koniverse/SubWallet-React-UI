import * as React from 'react';
import classNames from 'classnames';
import type { ForwardedRef } from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { InputRef } from 'rc-input';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import SwList from './List';
import type { SwListProps } from './List';
import Input from '../input';
import Button from '../button';

export interface SwListSectionProps<T> extends Omit<SwListProps<T>, 'searchBy' | 'searchTerm'> {
  listClassName?: string;
  searchFunction?: (item: T, searchText: string) => boolean;
  enableSearchInput?: boolean;
  searchPlaceholder?: string;
  showActionBtn?: boolean;
  actionBtnIcon?: React.ReactNode;
  onClickActionBtn?: () => void;
  height?: string;
  list: SwListProps<T>['list'];
  renderItem: SwListProps<T>['renderItem'];
  autoFocusSearch?: boolean;
}

export interface SwListSectionRef {
  setSearchValue: (value: string) => void;
}

const SwListSection = <T extends any>(
  props: SwListSectionProps<T>,
  ref: ForwardedRef<SwListSectionRef>,
) => {
  const {
    autoFocusSearch = true,
    prefixCls: customizePrefixCls,
    className,
    searchFunction,
    searchPlaceholder,
    height,
    mode = 'default',
    enableSearchInput,
    showActionBtn,
    actionBtnIcon,
    onClickActionBtn,
    ...restProps
  } = props;
  const searchRef = useRef<InputRef>(null);
  const { getPrefixCls } = React.useContext(ConfigContext);
  const basePrefixCls = getPrefixCls('sw-list', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(basePrefixCls);
  const classes = classNames(`${basePrefixCls}-section`, hashId, className, {
    '-boxed-mode': mode === 'boxed',
  });
  const [searchValue, setSearchValue] = useState<string>('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const searchBy = useCallback(
    (item: T) => (searchFunction ? searchFunction(item, searchValue) : true),
    [searchFunction, searchValue],
  );

  useImperativeHandle(ref, () => ({ setSearchValue }));

  useEffect(() => {
    if (enableSearchInput && autoFocusSearch) {
      searchRef.current?.focus();
    }
  }, [searchRef, enableSearchInput, autoFocusSearch]);

  return wrapSSR(
    <div className={classes} style={{ height }}>
      {enableSearchInput && (
        <div className={`${basePrefixCls}-search-input`}>
          <Input.Search
            onChange={onChange}
            placeholder={searchPlaceholder}
            value={searchValue}
            ref={searchRef}
            suffix={
              showActionBtn && (
                <div className={`__input-action ${basePrefixCls}-action-btn-wrapper`}>
                  <Button
                    onClick={onClickActionBtn}
                    className={`${basePrefixCls}-action-btn`}
                    size="xs"
                    type="ghost"
                    icon={actionBtnIcon}
                  />
                </div>
              )
            }
          />
        </div>
      )}
      <div className={`${basePrefixCls}-wrapper`}>
        <SwList
          {...restProps}
          prefixCls={customizePrefixCls}
          searchBy={searchBy}
          searchTerm={searchValue}
        />
      </div>
    </div>,
  );
};

export default forwardRef(SwListSection);
