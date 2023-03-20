import { CaretDown } from 'phosphor-react';
import classNames from 'classnames';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import type { PresetBarShapeType } from '../_util/shapes';
import { useToken } from '../theme/internal';
import type { SwListSectionProps } from '../sw-list';
import SwList from '../sw-list';
import SwModal from '../sw-modal';
import type { SwModalProps } from '../sw-modal';
import { ModalContext } from '../sw-modal/provider';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import useStyle from './style';
import Icon from '../icon';
import Typography from '../typography';

export type SelectModalSize = 'small' | 'medium';

export interface SelectModalItem extends Record<string, any> {
  disabled?: boolean;
}

export type SelectModalRenderItemFunc<T extends SelectModalItem> = (
  item: T,
  selected: boolean,
) => React.ReactNode;
export type SelectModalRenderSelectedFunc<T extends SelectModalItem> = (item: T) => React.ReactNode;

export interface SelectModalProps<T extends SelectModalItem>
  extends SwModalProps,
    Partial<
      Pick<
        SwListSectionProps<T>,
        | 'searchableMinCharactersCount'
        | 'searchFunction'
        | 'searchPlaceholder'
        | 'renderWhenEmpty'
        | 'ignoreScrollbar'
        | 'ignoreScrollbarMethod'
      >
    > {
  items: T[];
  itemKey: string;
  selected: string;
  renderItem: SelectModalRenderItemFunc<T>;
  renderSelected?: SelectModalRenderSelectedFunc<T>;
  inputClassName?: string;
  onSelect: (value: string) => void;
  size?: SelectModalSize;
  shape?: PresetBarShapeType;
  background?: 'default' | 'transparent';
  placeholder?: string;
  customInput?: React.ReactNode;
  inputWidth?: number | string;
  label?: string;
  hideSuffix?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  actionBtnIcon?: React.ReactNode;
  showActionBtn?: boolean;
  onClickActionBtn?: () => void;
}

const DEFAULT_SUFFIX = <Icon type='phosphor' phosphorIcon={CaretDown} size="xs" />;
const DEFAULT_PLACEHOLDER = 'Select box';
const DEFAULT_TITLE = 'Select modal';
const DEFAULT_SEARCH_PLACEHOLDER = 'Search';
const SelectModal = <T extends SelectModalItem>(props: SelectModalProps<T>): JSX.Element => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const [, token] = useToken();

  const { activeModal, inactiveModal, checkActive } = useContext(ModalContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    wrapClassName,
    focusTriggerAfterClose = true,
    items,
    renderItem,
    renderSelected,
    itemKey,
    selected,
    inputClassName,
    onSelect,
    shape = 'default',
    background = 'default',
    placeholder = DEFAULT_PLACEHOLDER,
    forceRenderFooter = false,
    inputWidth = '100%',
    title = 'Select modal',
    id,
    onCancel,
    label = '',
    suffix = DEFAULT_SUFFIX,
    prefix,
    hideSuffix,
    disabled,
    size: inputSize = 'medium',
    customInput,
    searchFunction,
    searchPlaceholder,
    searchableMinCharactersCount,
    renderWhenEmpty,
    ignoreScrollbar,
    ignoreScrollbarMethod,
    actionBtnIcon,
    showActionBtn,
    onClickActionBtn,
    ...restProps
  } = props;

  const isActive = checkActive(id);

  const [focusSearch, setFocusSearch] = useState(false);

  const selectedItem = useMemo<T | undefined>(
    () => items.find((item) => (item[itemKey] as string) === selected),
    [selected, items, itemKey],
  );

  const prefixCls = getPrefixCls('select-modal', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const openModal = useCallback(() => {
    if (!disabled) {
      activeModal(id);
    }
  }, [activeModal, id, disabled]);

  const handleCancel = useCallback(() => {
    inactiveModal(id);
    onCancel?.();
  }, [onCancel, id, inactiveModal]);

  const _renderInput = useCallback(
    (item: T | undefined) => {
      if (!item) {
        return (
          <Typography.Text className={classNames(`${prefixCls}-input-placeholder`)}>
            {placeholder || DEFAULT_PLACEHOLDER}
          </Typography.Text>
        );
      }

      if (renderSelected) {
        return renderSelected(item);
      }

      return renderItem(item, false);
    },
    [renderSelected, placeholder],
  );

  const _onSelect = useCallback(
    (item: T) => () => {
      if (!item.disabled) {
        onSelect(item[itemKey] as string);
        inactiveModal(id);
      }
    },
    [itemKey, onSelect, inactiveModal, id],
  );

  const _renderItem = useCallback(
    (item: T) => {
      const isSelected = item[itemKey] === selected;
      return (
        <div
          key={item[itemKey]}
          onClick={_onSelect(item)}
          className={classNames(`${prefixCls}-item`)}
        >
          {renderItem(item, isSelected)}
        </div>
      );
    },
    [_onSelect, renderItem, itemKey, selected],
  );

  useEffect(() => {
    let timeOut: NodeJS.Timer;

    if (isActive) {
      timeOut = setTimeout(() => {
        setFocusSearch(true);
      }, 200);
    } else {
      setFocusSearch(false);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [isActive]);

  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        {customInput ? (
          <div className={classNames(`${prefixCls}-input-custom`)} onClick={openModal}>
            {customInput}
          </div>
        ) : (
          <div
            onClick={openModal}
            className={classNames(
              hashId,
              `${prefixCls}-input-container`,
              `${prefixCls}-input-border-${shape}`,
              `${prefixCls}-input-bg-${background}`,
              `${prefixCls}-input-size-${inputSize}`,
              inputClassName,
              {
                [`${prefixCls}-input-focus`]: isActive,
                [`${prefixCls}-input-disabled`]: disabled,
                [`${prefixCls}-input-with-label`]: label,
              },
            )}
            style={{ width: inputWidth }}
          >
            {label && <div className={classNames(`${prefixCls}-input-label`)}>{label}</div>}
            <div className={classNames(`${prefixCls}-input-wrapper`)}>
              {prefix}
              <div className={classNames(`${prefixCls}-input-content`)}>
                {_renderInput(selectedItem)}
              </div>
              {!hideSuffix && suffix}
            </div>
          </div>
        )}
        <SwModal
          {...restProps}
          title={title || DEFAULT_TITLE}
          id={id}
          forceRenderFooter={forceRenderFooter}
          wrapClassName={wrapClassName}
          onCancel={handleCancel}
          focusTriggerAfterClose={focusTriggerAfterClose}
          className={classNames(hashId, className, prefixCls)}
        >
          <SwList.Section
            actionBtnIcon={actionBtnIcon}
            autoFocusSearch={focusSearch}
            className={classNames(hashId, `${prefixCls}-item-container`)}
            displayRow
            enableSearchInput={!!searchFunction}
            ignoreScrollbar={ignoreScrollbar}
            ignoreScrollbarMethod={ignoreScrollbarMethod}
            list={items}
            onClickActionBtn={onClickActionBtn}
            renderItem={_renderItem}
            renderWhenEmpty={renderWhenEmpty}
            rowGap={`${token.paddingContentVerticalSM}px`}
            searchFunction={searchFunction}
            searchPlaceholder={searchPlaceholder || DEFAULT_SEARCH_PLACEHOLDER}
            searchableMinCharactersCount={searchableMinCharactersCount}
            showActionBtn={showActionBtn}
          />
        </SwModal>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SelectModal;
