import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useCallback, useContext, useMemo } from 'react';
import * as React from 'react';
import Modal from '../sw-modal';
import type { SWModalProps } from '../sw-modal';
import { ModalContext } from '../sw-modal/provider';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import useStyle from './style';
import Icon from '../icon';
import Typography from '../typography';

export interface SelectModalProps<T extends Record<string, any>> extends SWModalProps {
  items: T[];
  itemKey: string;
  selected: string;
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  renderSelected?: (item: T) => React.ReactNode;
  inputClassName?: string;
  onSelect: (value: string) => void;
  shape?: 'default' | 'square' | 'round';
  background?: 'default' | 'transparent';
  placeholder?: string;
  size?: 'default' | 'sm' | 'medium' | 'large';
}

const SelectModal = <T extends Record<string, any>>(
  props: SelectModalProps<T>,
): React.ReactNode => {
  const { getPrefixCls } = React.useContext(ConfigContext);

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
    size: inputSize = 'default',
    forceRenderFooter = false,
    id,
    onCancel,
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

  const inputClassNameExtended = classNames(
    hashId,
    `${prefixCls}-input`,
    `${prefixCls}-input-border-${shape}`,
    `${prefixCls}-input-size-${inputSize}`,
    `${prefixCls}-input-bg-${background}`,
    inputClassName,
    {
      [`${prefixCls}-input-focus`]: isActive,
    },
  );

  const openModal = useCallback(() => {
    activeModal(id);
  }, [activeModal, id]);

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
    (item: T, _index: number, _selected: boolean) => (
      <div key={_index} onClick={_onSelect(item)} className={classNames(`${prefixCls}-item`)}>
        {renderItem(item, _selected)}
      </div>
    ),
    [_onSelect, renderItem],
  );

  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        <div onClick={openModal} className={inputClassNameExtended}>
          <div className={classNames(`${prefixCls}-input-content`)}>
            {_renderInput(selectedItem)}
          </div>
          <Icon type='fontAwesome' fontawesomeIcon={faAngleDown} size="xs" />
        </div>
        <Modal
          {...restProps}
          id={id}
          forceRenderFooter={forceRenderFooter}
          wrapClassName={wrapClassName}
          onCancel={handleCancel}
          focusTriggerAfterClose={focusTriggerAfterClose}
          className={classNames(hashId, className)}
        >
          <div className={classNames(hashId, `${prefixCls}-item-container`)}>
            {items.map((item, index) => {
              const isSelected = item[itemKey] === selected;
              return _renderItem(item, index, isSelected);
            })}
          </div>
        </Modal>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SelectModal;
