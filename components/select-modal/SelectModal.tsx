import { CaretDown } from 'phosphor-react';
import classNames from 'classnames';
import { useCallback, useContext, useMemo } from 'react';
import * as React from 'react';
import type { PresetBarShapeType } from '../_util/shapes';
import type { SizeType } from '../config-provider/SizeContext';
import { useToken } from '../theme/internal';
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

export interface SelectModalProps<T extends Record<string, any>> extends SwModalProps {
  items: T[];
  itemKey: string;
  selected: string;
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  renderSelected?: (item: T) => React.ReactNode;
  inputClassName?: string;
  onSelect: (value: string) => void;
  size?: SizeType;
  shape?: PresetBarShapeType;
  background?: 'default' | 'transparent';
  placeholder?: string;
  inputWidth?: number | string;
  label?: string;
  hideSuffix?: boolean;
  suffix?: React.ReactNode;
  disabled?: boolean;
}

const DEFAULT_SUFFIX = <Icon type='phosphor' phosphorIcon={CaretDown} size="xs" />;
const SelectModal = <T extends Record<string, any>>(
  props: SelectModalProps<T>,
): React.ReactNode => {
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
    placeholder = 'Select box',
    forceRenderFooter = false,
    inputWidth = '100%',
    id,
    onCancel,
    label = '',
    suffix = DEFAULT_SUFFIX,
    hideSuffix,
    disabled,
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
            {placeholder}
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
        <div
          onClick={openModal}
          className={classNames(
            hashId,
            `${prefixCls}-input-container`,
            `${prefixCls}-input-border-${shape}`,
            `${prefixCls}-input-bg-${background}`,
            // `${prefixCls}-input-size-${inputSize}`,
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
            <div className={classNames(`${prefixCls}-input-content`)}>
              {_renderInput(selectedItem)}
            </div>
            {!hideSuffix && suffix}
          </div>
        </div>
        <SwModal
          {...restProps}
          id={id}
          forceRenderFooter={forceRenderFooter}
          wrapClassName={wrapClassName}
          onCancel={handleCancel}
          focusTriggerAfterClose={focusTriggerAfterClose}
          className={classNames(hashId, className)}
        >
          <SwList
            list={items}
            renderItem={_renderItem}
            displayRow
            rowGap={`${token.paddingContentVerticalSM}px`}
            className={classNames(hashId, `${prefixCls}-item-container`)}
          />
        </SwModal>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SelectModal;
