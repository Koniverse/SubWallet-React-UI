import classNames from 'classnames';
import Dialog from 'rc-dialog';
import { useContext } from 'react';
import * as React from 'react';
import { ModalContext } from './provider';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import { getTransitionName } from '../_util/motion';
import { canUseDocElement } from '../_util/styleChecker';
import useInitModal from './hook/useInitModal';
import { renderCloseIcon, renderFooter } from './PurePanel';
import useStyle from './style';

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

export interface SWModalProps {
  confirmLoading?: boolean;
  title?: React.ReactNode;
  closable?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  afterClose?: () => void;
  width?: string | number;
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  maskClosable?: boolean;
  forceRender?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
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
  children?: React.ReactNode;
  mousePosition?: MousePosition;
  forceRenderFooter?: boolean;
  id: string;
}

type getContainerFunc = () => HTMLElement;

export interface SWModalFuncProps extends SWModalProps {
  content?: React.ReactNode;
  icon?: React.ReactNode;
  okCancel?: boolean;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  subTitle?: string;
}

export interface SWModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

const SWModal: React.FC<SWModalProps> = (props) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
  } = React.useContext(ConfigContext);

  const handleCancel = () => {
    const { onCancel } = props;
    onCancel?.();
  };

  const handleOk = () => {
    const { onOk } = props;
    onOk?.();
  };

  const {
    prefixCls: customizePrefixCls,
    className,
    wrapClassName,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    // Deprecated
    width = 400,
    id,
    ...restProps
  } = props;

  useInitModal(id);

  const { checkActive } = useContext(ModalContext);

  const isActive = checkActive(id);

  const prefixCls = getPrefixCls('sw-modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl',
    [`${prefixCls}-d-none`]: !isActive,
  });

  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        <Dialog
          width={width}
          {...restProps}
          getContainer={getContainer === undefined ? getContextPopupContainer : getContainer}
          prefixCls={prefixCls}
          rootClassName={hashId}
          wrapClassName={wrapClassNameExtended}
          footer={renderFooter({
            ...props,
            onOk: handleOk,
            onCancel: handleCancel,
          })}
          visible={isActive}
          mousePosition={restProps.mousePosition ?? mousePosition}
          onClose={handleCancel}
          closeIcon={renderCloseIcon(prefixCls, closeIcon)}
          focusTriggerAfterClose={focusTriggerAfterClose}
          transitionName={getTransitionName(rootPrefixCls, 'slide-down', props.transitionName)}
          maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
          className={classNames(hashId, className)}
        />
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SWModal;
