import classNames from 'classnames';
import { Panel } from 'rc-dialog';
import type { PanelProps } from 'rc-dialog/lib/Dialog/Content/Panel';
import * as React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale/LocaleReceiver';
import { SwConfirmContent } from './SwConfirmDialog';
import { getConfirmLocale } from './locale';
import type { SwModalProps, SwModalFuncProps } from './SwModal';
import Icon from '../icon';

import useStyle from './style';

export interface PurePanelProps
  extends Omit<PanelProps, 'prefixCls'>,
    Pick<SwModalFuncProps, 'type'> {
  prefixCls?: string;
  style?: React.CSSProperties;
}

export function renderCloseIcon(prefixCls: string, closeIcon?: React.ReactNode) {
  return (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <Icon type="fontAwesome" fontawesomeIcon={faXmark} size="sm" />}
    </span>
  );
}

export function renderFooter(
  props: Pick<
    SwModalProps,
    | 'forceRenderFooter'
    | 'footer'
    | 'okText'
    | 'okType'
    | 'cancelText'
    | 'confirmLoading'
    | 'okButtonProps'
    | 'cancelButtonProps'
  > & {
    onOk?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  },
) {
  const {
    okText,
    okType = 'default',
    cancelText,
    confirmLoading,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps,
    footer,
    forceRenderFooter = false,
  } = props;

  if (footer) {
    return footer;
  }

  if (forceRenderFooter) {
    return (
      <LocaleReceiver componentName="Modal" defaultLocale={getConfirmLocale()}>
        {(locale) => (
          <>
            <Button onClick={onCancel} type="default" schema="secondary" {...cancelButtonProps}>
              {cancelText || locale!.cancelText}
            </Button>
            <Button
              {...convertLegacyProps(okType)}
              loading={confirmLoading}
              onClick={onOk}
              {...okButtonProps}
            >
              {okText || locale!.okText}
            </Button>
          </>
        )}
      </LocaleReceiver>
    );
  }

  return undefined;
}

export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable,
    type,
    title,
    children,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = customizePrefixCls || getPrefixCls('sw-modal');

  const [, hashId] = useStyle(prefixCls);

  const confirmPrefixCls = `${prefixCls}-confirm`;

  // Choose target props by confirm mark
  let additionalProps: Partial<PanelProps> = {};
  if (type) {
    additionalProps = {
      closable: closable ?? false,
      title: '',
      footer: '',
      children: (
        <SwConfirmContent {...props} confirmPrefixCls={confirmPrefixCls} content={children} />
      ),
    };
  } else {
    additionalProps = {
      closable: closable ?? true,
      title,
      footer: renderFooter(props),
      children,
    };
  }

  return (
    <Panel
      prefixCls={prefixCls}
      className={classNames(
        hashId,
        `${prefixCls}-pure-panel`,
        type && confirmPrefixCls,
        type && `${confirmPrefixCls}-${type}`,
        className,
      )}
      {...restProps}
      closeIcon={renderCloseIcon(prefixCls, closeIcon)}
      closable={closable}
      {...additionalProps}
    />
  );
}
