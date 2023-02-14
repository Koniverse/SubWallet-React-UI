import classNames from 'classnames';
import type { InputProps as RcInputProps, InputRef } from 'rc-input';
import RcInput from 'rc-input';
import type { BaseInputProps } from 'rc-input/lib/interface';
import { composeRef } from 'rc-util/lib/ref';
import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import { CheckCircle, WarningCircle, XCircle } from 'phosphor-react';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import { NoCompactStyle, useCompactItemContext } from '../space/Compact';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import { hasPrefixSuffix } from './utils';

// CSSINJS
import useStyle from './style';
import type { PresetBarShapeType } from '../_util/shapes';
import type { SwIconProps } from '../icon';
import Icon from '../icon';

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}

export type { InputRef };

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}

export function resolveOnChange<E extends HTMLInputElement | HTMLTextAreaElement>(
  target: E,
  e:
    | React.ChangeEvent<E>
    | React.MouseEvent<HTMLElement, MouseEvent>
    | React.CompositionEvent<HTMLElement>,
  onChange: undefined | ((event: React.ChangeEvent<E>) => void),
  targetValue?: string,
) {
  if (!onChange) {
    return;
  }
  let event = e as React.ChangeEvent<E>;

  if (e.type === 'click') {
    // Clone a new target for event.
    // Avoid the following usage, the setQuery method gets the original value.
    //
    // const [query, setQuery] = React.useState('');
    // <Input
    //   allowClear
    //   value={query}
    //   onChange={(e)=> {
    //     setQuery((prevStatus) => e.target.value);
    //   }}
    // />

    const currentTarget = target.cloneNode(true) as E;

    // click clear icon
    event = Object.create(e, {
      target: { value: currentTarget },
      currentTarget: { value: currentTarget },
    });

    currentTarget.value = '';
    onChange(event);
    return;
  }

  // Trigger by composition event, this means we need force change the input value
  if (targetValue !== undefined) {
    event = Object.create(e, {
      target: { value: target },
      currentTarget: { value: target },
    });

    target.value = targetValue;
    onChange(event);
    return;
  }
  onChange(event);
}

export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) {
    return;
  }

  element.focus(option);

  // Selection content
  const { cursor } = option || {};
  if (cursor) {
    const len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;
      case 'end':
        element.setSelectionRange(len, len);
        break;
      default:
        element.setSelectionRange(0, len);
        break;
    }
  }
}

export interface InputProps
  extends Omit<
    RcInputProps,
    'wrapperClassName' | 'groupClassName' | 'inputClassName' | 'affixWrapperClassName'
  > {
  size?: SizeType;
  disabled?: boolean;
  status?: InputStatus;
  bordered?: boolean;
  shape?: PresetBarShapeType;
  label?: string;
  displaySuccessStatus?: boolean;
  containerClassName?: string;
  [key: `data-${string}`]: string | undefined;
}

const StatusIconMap: Record<string, SwIconProps['phosphorIcon']> = {
  success: CheckCircle,
  error: XCircle,
  warning: WarningCircle,
};

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    status: customStatus,
    disabled: customDisabled,
    onBlur,
    onFocus,
    suffix,
    prefix,
    allowClear,
    addonAfter,
    addonBefore,
    className,
    onChange,
    displaySuccessStatus = false,
    containerClassName,
    shape = 'default',
    label,
    ...rest
  } = props;
  const { getPrefixCls, direction, input } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('input', customizePrefixCls);
  const inputRef = useRef<InputRef>(null);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  // ===================== Compact Item =====================
  const { compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  // ===================== Status =====================
  const { status: contextStatus, hasFeedback } = useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ===================== Focus warning =====================
  const inputHasPrefixSuffix = hasPrefixSuffix(props) || !!hasFeedback;
  const prevHasPrefixSuffix = useRef<boolean>(inputHasPrefixSuffix);
  useEffect(() => {
    if (inputHasPrefixSuffix && !prevHasPrefixSuffix.current) {
      warning(
        document.activeElement === inputRef.current?.input,
        'Input',
        `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`,
      );
    }
    prevHasPrefixSuffix.current = inputHasPrefixSuffix;
  }, [inputHasPrefixSuffix]);

  // ===================== Remove Password value =====================
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onFocus?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    removePasswordTimeout();
    onChange?.(e);
  };

  const suffixNode = (!!mergedStatus || suffix) && (
    <>
      {!!mergedStatus && (mergedStatus !== 'success' || displaySuccessStatus) && (
        <Icon
          phosphorIcon={StatusIconMap[mergedStatus]}
          weight="fill"
          className={`${prefixCls}-status-icon`}
        />
      )}
      {suffix}
    </>
  );

  // Allow clear
  let mergedAllowClear: BaseInputProps['allowClear'];
  if (typeof allowClear === 'object' && allowClear?.clearIcon) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = {
      clearIcon: (
        <div className='__input-action'>
          <Icon phosphorIcon={XCircle} weight="fill" />
        </div>
      ),
    };
  }

  return wrapSSR(
    <div
      className={classNames(
        `${prefixCls}-container`,
        className,
        {
          [`${containerClassName}`]: !!containerClassName,
          [`-shape-${shape}`]: !!shape,
          [`-rtl`]: direction === 'rtl',
          '-has-prefix': !!prefix,
          '-has-suffix': !!mergedStatus || !!suffix,
          '-has-label': !!label,
          '-disabled': !!mergedDisabled,
          '-display-success-status': displaySuccessStatus,
        },
        getStatusClassNames('', mergedStatus, hasFeedback),
        hashId,
      )}
    >
      {!!label && <div className={`${prefixCls}-label`}>{label}</div>}
      <div className={`${prefixCls}-wrapper`}>
        <RcInput
          ref={composeRef(ref, inputRef)}
          prefixCls={prefixCls}
          autoComplete={input?.autoComplete}
          {...rest}
          disabled={mergedDisabled || undefined}
          onBlur={handleBlur}
          onFocus={handleFocus}
          suffix={suffixNode}
          prefix={prefix}
          allowClear={mergedAllowClear}
          className={classNames(compactItemClassnames)}
          onChange={handleChange}
          addonAfter={
            addonAfter && (
              <NoCompactStyle>
                <NoFormStyle override status>
                  {addonAfter}
                </NoFormStyle>
              </NoCompactStyle>
            )
          }
          addonBefore={
            addonBefore && (
              <NoCompactStyle>
                <NoFormStyle override status>
                  {addonBefore}
                </NoFormStyle>
              </NoCompactStyle>
            )
          }
          inputClassName={hashId}
        />
      </div>
    </div>,
  );
});

export default Input;
