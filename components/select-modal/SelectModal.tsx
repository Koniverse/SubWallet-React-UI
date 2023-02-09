import { CaretDown } from 'phosphor-react';
import classNames from 'classnames';
import { useCallback, useContext, useMemo } from 'react';
import * as React from 'react';
import type { PresetBarShapeType } from '../_util/shapes';
import { useToken } from '../theme/internal';
import type { SwListProps } from '../sw-list';
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
export interface SelectModalProps<T extends Record<string, any>>
  extends SwModalProps,
    Pick<SwListProps, 'searchableMinCharactersCount'> {
  items: T[];
  itemKey: string;
  selected: string;
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  renderSelected?: (item: T) => React.ReactNode;
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

  // Search
  searchPlaceholder?: string;
  searchFunction?: (item: T, searchText: string) => boolean;
}

const DEFAULT_SUFFIX = <Icon type='phosphor' phosphorIcon={CaretDown} size="xs" />;
const DEFAULT_PLACEHOLDER = 'Select box';
const DEFAULT_TITLE = 'Select modal';
const DEFAULT_SEARCH_PLACEHOLDER = 'Search';
const SelectModal = <T extends Record<string, any>>(props: SelectModalProps<T>): JSX.Element => {
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
    ...restProps
  } = props;

  const isActive = checkActive(id);

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
      onSelect(item[itemKey] as string);
      inactiveModal(id);
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
          className={classNames(hashId, className)}
          bodyStyle={{
            display: 'flex',
            padding: 0,
          }}
        >
          <SwList.Section
            list={items}
            renderItem={_renderItem}
            displayRow
            rowGap={`${token.paddingContentVerticalSM}px`}
            enableSearchInput={!!searchFunction}
            searchFunction={searchFunction}
            className={classNames(hashId, `${prefixCls}-item-container`)}
            searchPlaceholder={searchPlaceholder || DEFAULT_SEARCH_PLACEHOLDER}
            searchableMinCharactersCount={searchableMinCharactersCount}
          />
        </SwModal>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SelectModal;
