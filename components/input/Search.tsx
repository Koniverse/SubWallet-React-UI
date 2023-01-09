import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import { cloneElement } from '../_util/reactNode';
import type { InputProps, InputRef } from './Input';
import Input from './Input';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  enterButton?: React.ReactNode;
  loading?: boolean;
}

const Search = React.forwardRef<InputRef, SearchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    className,
    size: customizeSize,
    suffix,
    loading,
    disabled,
    onSearch: customOnSearch,
    onChange: customOnChange,
    onCompositionStart,
    onCompositionEnd,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const contextSize = React.useContext(SizeContext);
  const composedRef = React.useRef<boolean>(false);

  const prefixCls = getPrefixCls('input-search', customizePrefixCls);
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const { compactSize } = useCompactItemContext(prefixCls, direction);

  const size = compactSize || customizeSize || contextSize;

  const inputRef = React.useRef<InputRef>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.type === 'click' && customOnSearch) {
      customOnSearch((e as React.ChangeEvent<HTMLInputElement>).target.value, e);
    }
    if (customOnChange) {
      customOnChange(e);
    }
  };

  const onMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    if (document.activeElement === inputRef.current?.input) {
      e.preventDefault();
    }
  };

  const onSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    if (customOnSearch) {
      customOnSearch(inputRef.current?.input?.value!, e);
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (composedRef.current || loading) {
      return;
    }
    onSearch(e);
  };

  const button = cloneElement(
    <div className="__input-action">
      <Icon phosphorIcon={MagnifyingGlass} />
    </div>,
    {
      onMouseDown,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        onSearch(e);
      },
      key: 'enterButton',
    },
  );

  const cls = classNames(prefixCls, className);

  const handleOnCompositionStart: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = true;
    onCompositionStart?.(e);
  };

  const handleOnCompositionEnd: React.CompositionEventHandler<HTMLInputElement> = (e) => {
    composedRef.current = false;
    onCompositionEnd?.(e);
  };

  return (
    <Input
      ref={composeRef<InputRef>(inputRef, ref)}
      onPressEnter={onPressEnter}
      {...restProps}
      size={size}
      onCompositionStart={handleOnCompositionStart}
      onCompositionEnd={handleOnCompositionEnd}
      prefixCls={inputPrefixCls}
      prefix={button}
      suffix={suffix}
      containerClassName="-search"
      onChange={onChange}
      className={cls}
      disabled={disabled}
    />
  );
});
if (process.env.NODE_ENV !== 'production') {
  Search.displayName = 'Search';
}

export default Search;
