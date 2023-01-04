import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Dialog from 'rc-dialog';
import { useCallback, useContext, useMemo } from 'react';
import * as React from 'react';
import { SelectModalContext } from './provider';
import useInitSelectModal from './hook/useInitSelectModal';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import { getTransitionName } from '../_util/motion';
import { canUseDocElement } from '../_util/styleChecker';
import { renderCloseIcon } from './PurePanel';
import useStyle from './style';
import Icon from '../icon';
import Typography from '../typography';

type MousePosition = { x: number; y: number } | null;

let mousePosition: MousePosition;

// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

export interface SelectModalProps<T extends Record<string, any>> {
  /** 对话框是否可见 */
  /** 标题 */
  title?: React.ReactNode;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 点击确定回调 */
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterClose?: () => void;
  /** 宽度 */
  width?: string | number;
  /** 确认按钮文字 */
  maskClosable?: boolean;
  /** 强制渲染 Modal */
  forceRender?: boolean;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  wrapProps?: any;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
  mousePosition?: MousePosition;
  items: T[];
  itemKey: string;
  selected: string;
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  renderSelected?: (item?: T) => React.ReactNode;
  inputClassName?: string;
  onSelect: (value: string) => void;
  id: string;
  shape?: 'default' | 'square' | 'rounded';
  background?: 'default' | 'transparent';
}

type getContainerFunc = () => HTMLElement;

const SelectModal = <T extends Record<string, any>>(
  props: SelectModalProps<T>,
): React.ReactNode => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
  } = React.useContext(ConfigContext);

  const { activeModal, checkActive, inactiveModal } = useContext(SelectModalContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    wrapClassName,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    width = 400,
    items,
    renderItem,
    renderSelected,
    itemKey,
    selected,
    inputClassName,
    onSelect,
    title = 'Select',
    shape = 'default',
    background = 'default',
    id,
    onCancel,
    ...restProps
  } = props;

  useInitSelectModal(id);

  const isActive = checkActive(id);

  const selectedItem = useMemo<T | undefined>(
    () => items.find((item) => (item[itemKey] as string) === selected),
    [selected, items, itemKey],
  );

  const prefixCls = getPrefixCls('select-modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl',
    [`${prefixCls}-d-none`]: !isActive,
  });

  const inputClassNameExtended = classNames(hashId, `${prefixCls}-input`, inputClassName, {
    [`${prefixCls}-input-default`]: shape === 'default',
    [`${prefixCls}-input-square`]: shape === 'square',
    [`${prefixCls}-input-rounded`]: shape === 'rounded',
    [`${prefixCls}-input-bg-default`]: background === 'default',
    [`${prefixCls}-input-bg-transparent`]: background === 'transparent',
  });

  const openModal = useCallback(() => {
    activeModal(id);
  }, [activeModal, id]);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      inactiveModal(id);
      onCancel?.(e);
    },
    [onCancel, id, inactiveModal],
  );

  const _renderInput = useCallback(
    (item: T | undefined) => {
      if (renderSelected) {
        return renderSelected(item);
      }

      if (!item) {
        return <Typography.Text style={{ color: 'white' }}>Select</Typography.Text>;
      }

      return renderItem(item, false);
    },
    [renderSelected],
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
        <Dialog
          width={width}
          title={title}
          {...restProps}
          getContainer={getContainer === undefined ? getContextPopupContainer : getContainer}
          prefixCls={prefixCls}
          rootClassName={hashId}
          wrapClassName={wrapClassNameExtended}
          visible={isActive}
          mousePosition={restProps.mousePosition ?? mousePosition}
          onClose={handleCancel}
          closeIcon={renderCloseIcon(prefixCls, closeIcon)}
          focusTriggerAfterClose={focusTriggerAfterClose}
          transitionName={getTransitionName(rootPrefixCls, 'slide-down', props.transitionName)}
          maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
          className={classNames(hashId, className)}
        >
          <div className={classNames(`${prefixCls}-item-container`)}>
            {items.map((item, index) => {
              const isSelected = item[itemKey] === selected;
              return _renderItem(item, index, isSelected);
            })}
          </div>
        </Dialog>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SelectModal;
