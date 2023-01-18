import classNames from 'classnames';
import { useMemo } from 'react';
import * as React from 'react';
import { Warning, CheckCircle, XCircle, Info } from 'phosphor-react';
import { useToken } from '../theme/internal';
import { ConfigContext } from '../config-provider';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { convertLegacyProps } from '../button/button';
import LocaleReceiver from '../locale/LocaleReceiver';
import Button from '../button';
import warning from '../_util/warning';
import type { SwModalFuncProps, SwModalLocale } from './SwModal';
import SwModal from './SwModal';
import Icon from '../icon';

export interface SwConfirmDialogProps extends SwModalFuncProps {
  autoFocusButton?: null | 'ok' | 'cancel';
  iconPrefixCls?: string;

  /** @private Internal Usage. Do not override this */
  locale?: SwModalLocale;
}

export const SwConfirmContent = (
  props: Omit<SwConfirmDialogProps, 'id'> & { confirmPrefixCls: string },
) => {
  const {
    icon,
    onCancel,
    onOk,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    confirmPrefixCls,
    type,
    okCancel,
    footer,
    // Legacy for static function usage
    locale: staticLocale,
    okType: originOkType,
  } = props;

  const okType = useMemo((): LegacyButtonType => {
    if (originOkType) {
      return originOkType;
    }

    switch (type) {
      case 'error':
        return 'danger';
      default:
        return 'default';
    }
  }, [originOkType, type]);

  const [, token] = useToken();

  const okProps = useMemo((): ButtonProps | undefined => {
    const result = {
      ...okButtonProps,
      ...convertLegacyProps(okType),
      icon: <Icon type="phosphor" phosphorIcon={CheckCircle} />,
    };

    if (!okButtonProps?.icon) {
      switch (okType) {
        case 'danger':
          result.icon = <Icon type="phosphor" phosphorIcon={XCircle} weight="fill" />;
          break;
        default:
          result.icon = <Icon type="phosphor" phosphorIcon={CheckCircle} />;
      }
    }

    return result;
  }, [okButtonProps, okType]);

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Modal',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
  );

  const mergedIcon = useMemo((): React.ReactNode => {
    if (!icon && icon !== null) {
      const iconSize: string = '20px';
      switch (type) {
        case 'info':
          return <Icon type="phosphor" phosphorIcon={Info} customSize={iconSize} />;
        case 'warning':
        case 'warn':
          return (
            <Icon
              type="phosphor"
              phosphorIcon={Warning}
              customSize={iconSize}
              iconColor={token.colorWarning}
            />
          );
        default:
          return undefined;
      }
    } else {
      return icon;
    }
  }, [icon, token.colorWarning, type]);

  const mergedOkCancel = okCancel;

  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';

  return (
    <LocaleReceiver componentName="Modal">
      {(locale) => {
        const mergedLocale = staticLocale || locale;

        const cancelButton = mergedOkCancel && (
          <Button
            {...cancelButtonProps}
            onClick={onCancel}
            autoFocus={autoFocusButton === 'cancel'}
          >
            {cancelText || mergedLocale?.cancelText}
          </Button>
        );

        return (
          <div className={`${confirmPrefixCls}-body-wrapper`}>
            <div className={`${confirmPrefixCls}-body`}>
              <span className={`${confirmPrefixCls}-sub-title-container`}>
                {mergedIcon && (
                  <span className={`${confirmPrefixCls}-icon-container`}>{mergedIcon}</span>
                )}
                {props.subTitle === undefined ? null : (
                  <span className={`${confirmPrefixCls}-sub-title`}>{props.subTitle}</span>
                )}
              </span>
              <div className={`${confirmPrefixCls}-content`}>{props.content}</div>
            </div>
            {footer !== undefined ? (
              footer
            ) : (
              <div className={`${confirmPrefixCls}-btns`}>
                {cancelButton}
                <Button {...okProps} onClick={onOk} autoFocus={autoFocusButton === 'ok'}>
                  {okText || (mergedOkCancel ? mergedLocale?.okText : mergedLocale?.justOkText)}
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </LocaleReceiver>
  );
};

const SwConfirmDialog = (props: SwConfirmDialogProps) => {
  const {
    zIndex,
    afterClose,
    keyboard,
    getContainer,
    maskStyle,
    prefixCls: customizePrefixCls,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose,
    maskClosable = false,
    mask = true,
    id,
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('sw-modal', customizePrefixCls);
  const confirmPrefixCls = `${prefixCls}-confirm`;

  const width = props.width || 400;
  const style = props.style || {};

  const classString = classNames(
    prefixCls,
    confirmPrefixCls,
    `${confirmPrefixCls}-${props.type}`,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
    props.className,
  );

  return (
    <SwModal
      {...props}
      forceRenderFooter={false}
      prefixCls={prefixCls}
      className={classString}
      mask={mask}
      maskClosable={maskClosable}
      maskStyle={maskStyle}
      style={style}
      bodyStyle={bodyStyle}
      width={width}
      zIndex={zIndex}
      afterClose={afterClose}
      keyboard={keyboard}
      getContainer={getContainer}
      closable={closable}
      closeIcon={closeIcon}
      modalRender={modalRender}
      focusTriggerAfterClose={focusTriggerAfterClose}
      id={id}
    >
      <SwConfirmContent {...props} confirmPrefixCls={confirmPrefixCls} />
    </SwModal>
  );
};

if (process.env.NODE_ENV !== 'production') {
  SwConfirmDialog.displayName = 'SwConfirmDialog';
}

export default SwConfirmDialog;
