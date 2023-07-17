import { CaretDown, CheckCircle, WarningCircle, XCircle } from 'phosphor-react';
import classNames from 'classnames';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import ActivityIndicator from '../activity-indicator';
import type { PresetBarShapeType } from '../_util/shapes';
import { useToken } from '../theme/internal';
import type { SwListSectionRef, SwListSectionProps } from '../sw-list';
import SwList from '../sw-list';
import SwModal from '../sw-modal';
import type { SwModalProps } from '../sw-modal';
import { ModalContext } from '../sw-modal/provider';
import { ConfigContext } from '../config-provider';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import Tooltip from '../tooltip';
import useStyle from './style';
import type { SwIconProps } from '../icon';
import Icon from '../icon';
import Typography from '../typography';
import type { InputStatus } from '../_util/statusUtils';
import type { TooltipPlacement } from '../tooltip';

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
        | 'searchMinCharactersCount'
        | 'searchFunction'
        | 'searchPlaceholder'
        | 'renderWhenEmpty'
        | 'ignoreScrollbar'
        | 'ignoreScrollbarMethod'
        | 'filterBy'
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
  loading?: boolean;
  displaySuccessStatus?: boolean;
  status?: InputStatus;
  statusHelp?: string;
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
}

const DEFAULT_SUFFIX = <Icon type='phosphor' phosphorIcon={CaretDown} size='sm' />;
const DEFAULT_PLACEHOLDER = 'Select box';
const DEFAULT_TITLE = 'Select modal';
const DEFAULT_SEARCH_PLACEHOLDER = 'Search';
const StatusIconMap: Record<string, SwIconProps['phosphorIcon']> = {
  success: CheckCircle,
  error: XCircle,
  warning: WarningCircle,
};

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
    loading,
    suffix = DEFAULT_SUFFIX,
    prefix,
    hideSuffix,
    disabled,
    size: inputSize = 'medium',
    customInput,
    searchFunction,
    searchPlaceholder,
    searchMinCharactersCount,
    renderWhenEmpty,
    ignoreScrollbar,
    ignoreScrollbarMethod,
    actionBtnIcon,
    showActionBtn,
    onClickActionBtn,
    filterBy,
    tooltipPlacement = 'topLeft',
    tooltip,
    statusHelp,
    displaySuccessStatus,
    status: customStatus,
    ...restProps
  } = props;

  const isActive = checkActive(id);

  const [focusSearch, setFocusSearch] = useState(false);

  const selectedItem = useMemo<T | undefined>(
    () => items.find((item) => (item[itemKey] as string) === selected),
    [selected, items, itemKey],
  );

  const { status: contextStatus, hasFeedback } = useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  const prefixCls = getPrefixCls('select-modal', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const sectionRef = useRef<SwListSectionRef>(null);

  const suffixNode = useMemo((): React.ReactNode => {
    if (loading) {
      return <ActivityIndicator size={token.size} />;
    }

    return (
      (!!mergedStatus || suffix) && (
        <>
          {!!mergedStatus && (mergedStatus !== 'success' || displaySuccessStatus) && (
            <Icon
              phosphorIcon={StatusIconMap[mergedStatus]}
              weight='fill'
              className={`${prefixCls}-status-icon`}
            />
          )}
          {!hideSuffix && suffix}
        </>
      )
    );
  }, [loading, mergedStatus, suffix, displaySuccessStatus, prefixCls, hideSuffix, token.size]);

  const enableSearchInput = !!searchFunction;

  const openModal = useCallback(() => {
    if (!disabled && !loading) {
      activeModal(id);
    }
  }, [activeModal, id, disabled, loading]);

  const clearSearchInput = useCallback(() => {
    if (enableSearchInput) {
      sectionRef.current?.setSearchValue('');
    }
  }, [enableSearchInput]);

  const handleCancel = useCallback(() => {
    inactiveModal(id);
    onCancel?.();
    clearSearchInput();
  }, [onCancel, id, inactiveModal, clearSearchInput]);

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
    [renderSelected, renderItem, prefixCls, placeholder],
  );

  const _onSelect = useCallback(
    (item: T) => () => {
      if (!item.disabled) {
        onSelect(item[itemKey] as string);
        inactiveModal(id);
        clearSearchInput();
      }
    },
    [itemKey, onSelect, inactiveModal, id, clearSearchInput],
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
    [itemKey, selected, _onSelect, prefixCls, renderItem],
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
      <NoFormStyle override>
        <Tooltip trigger='hover' title={statusHelp || tooltip} placement={tooltipPlacement}>
          {customInput ? (
            <div
              className={classNames(hashId, `${prefixCls}-input-custom`, {
                [`${prefixCls}-input-focus`]: isActive,
                [`${prefixCls}-input-disabled`]: disabled,
              })}
              onClick={openModal}
            >
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
                getStatusClassNames('', mergedStatus, hasFeedback),
                {
                  [`${prefixCls}-input-focus`]: isActive,
                  [`${prefixCls}-input-disabled`]: disabled,
                  [`${prefixCls}-input-loading`]: loading,
                  [`${prefixCls}-input-with-label`]: label,
                },
              )}
              style={{ width: inputWidth }}
            >
              {label && <div className={classNames(`${prefixCls}-input-label`)}>{label}</div>}
              <div className={classNames(`${prefixCls}-input-wrapper`)}>
                {prefix && <div className={classNames(`${prefixCls}-input-prefix`)}>{prefix}</div>}
                <div className={classNames(`${prefixCls}-input-content`)}>
                  {_renderInput(selectedItem)}
                </div>
                <div className={classNames(`${prefixCls}-input-suffix`)}>{suffixNode}</div>
              </div>
            </div>
          )}
        </Tooltip>
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
            ref={sectionRef}
            actionBtnIcon={actionBtnIcon}
            autoFocusSearch={focusSearch}
            className={classNames(hashId, `${prefixCls}-item-container`)}
            displayRow
            enableSearchInput={enableSearchInput}
            filterBy={filterBy}
            ignoreScrollbar={ignoreScrollbar}
            ignoreScrollbarMethod={ignoreScrollbarMethod}
            list={items}
            onClickActionBtn={onClickActionBtn}
            renderItem={_renderItem}
            renderWhenEmpty={renderWhenEmpty}
            rowGap={`${token.paddingContentVerticalSM}px`}
            searchFunction={searchFunction}
            searchPlaceholder={searchPlaceholder || DEFAULT_SEARCH_PLACEHOLDER}
            searchMinCharactersCount={searchMinCharactersCount}
            showActionBtn={showActionBtn}
          />
        </SwModal>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SelectModal;
