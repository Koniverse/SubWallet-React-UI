import classNames from 'classnames';
import type { TextAreaProps as RcTextAreaProps } from 'rc-textarea';
import RcTextArea from 'rc-textarea';
import type { ResizableTextAreaRef } from 'rc-textarea/lib/ResizableTextArea';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { CheckCircle, WarningCircle, XCircle } from 'phosphor-react';
import type { PresetBarShapeType } from '../_util/shapes';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import ClearableLabeledInput from './ClearableLabeledInput';
import type { InputFocusOptions } from './Input';
import { fixControlledValue, resolveOnChange, triggerFocus } from './Input';
import useStyle from './style';
import type { SWIconProps } from '../icon';
import Icon from '../icon';

interface ShowCountProps {
  formatter: (args: { value: string; count: number; maxLength?: number }) => string;
}

function fixEmojiLength(value: string, maxLength: number) {
  return [...(value || '')].slice(0, maxLength).join('');
}

function setTriggerValue(
  isCursorInEnd: boolean,
  preValue: string,
  triggerValue: string,
  maxLength: number,
) {
  let newTriggerValue = triggerValue;
  if (isCursorInEnd) {
    // 光标在尾部，直接截断
    newTriggerValue = fixEmojiLength(triggerValue, maxLength!);
  } else if (
    [...(preValue || '')].length < triggerValue.length &&
    [...(triggerValue || '')].length > maxLength!
  ) {
    // 光标在中间，如果最后的值超过最大值，则采用原先的值
    newTriggerValue = preValue;
  }
  return newTriggerValue;
}

export interface TextAreaProps extends RcTextAreaProps {
  allowClear?: boolean;
  bordered?: boolean;
  showCount?: boolean | ShowCountProps;
  size?: SizeType;
  disabled?: boolean;
  status?: InputStatus;
  shape?: PresetBarShapeType;
  label?: string;
}

export interface TextAreaRef {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  resizableTextArea?: ResizableTextAreaRef;
}

const StatusIconMap: Record<string, SWIconProps['phosphorIcon']> = {
  success: CheckCircle,
  error: XCircle,
  warning: WarningCircle,
};

const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
      prefixCls: customizePrefixCls,
      bordered = true,
      showCount = false,
      maxLength,
      className,
      style,
      size: customizeSize,
      disabled: customDisabled,
      onCompositionStart,
      onCompositionEnd,
      onChange,
      status: customStatus,
      shape = 'default',
      label,
      ...props
    },
    ref,
  ) => {
    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const size = React.useContext(SizeContext);

    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

    const { status: contextStatus, hasFeedback } = React.useContext(FormItemInputContext);
    const mergedStatus = getMergedStatus(contextStatus, customStatus);

    const innerRef = React.useRef<RcTextArea>(null);
    const clearableInputRef = React.useRef<ClearableLabeledInput>(null);

    const [compositing, setCompositing] = React.useState(false);
    const oldCompositionValueRef = React.useRef<string>();
    const oldSelectionStartRef = React.useRef<number>(0);

    const [value, setValue] = useMergedState(props.defaultValue, {
      value: props.value,
    });

    const handleSetValue = (val: string, callback?: () => void) => {
      if (props.value === undefined) {
        setValue(val);
        callback?.();
      }
    };

    // =========================== Value Update ===========================
    // Max length value
    const hasMaxLength = Number(maxLength) > 0;

    const onInternalCompositionStart: React.CompositionEventHandler<HTMLTextAreaElement> = (e) => {
      setCompositing(true);
      // 拼音输入前保存一份旧值
      oldCompositionValueRef.current = value as string;
      // 保存旧的光标位置
      oldSelectionStartRef.current = e.currentTarget.selectionStart;
      onCompositionStart?.(e);
    };

    const onInternalCompositionEnd: React.CompositionEventHandler<HTMLTextAreaElement> = (e) => {
      setCompositing(false);

      let triggerValue = e.currentTarget.value;
      if (hasMaxLength) {
        const isCursorInEnd =
          oldSelectionStartRef.current >= maxLength! + 1 ||
          oldSelectionStartRef.current === oldCompositionValueRef.current?.length;
        triggerValue = setTriggerValue(
          isCursorInEnd,
          oldCompositionValueRef.current as string,
          triggerValue,
          maxLength!,
        );
      }
      // Patch composition onChange when value changed
      if (triggerValue !== value) {
        handleSetValue(triggerValue);
        resolveOnChange(e.currentTarget, e, onChange, triggerValue);
      }

      onCompositionEnd?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let triggerValue = e.target.value;
      if (!compositing && hasMaxLength) {
        // 1. 复制粘贴超过maxlength的情况 2.未超过maxlength的情况
        const isCursorInEnd =
          e.target.selectionStart >= maxLength! + 1 ||
          e.target.selectionStart === triggerValue.length ||
          !e.target.selectionStart;
        triggerValue = setTriggerValue(isCursorInEnd, value as string, triggerValue, maxLength!);
      }
      handleSetValue(triggerValue);
      resolveOnChange(e.currentTarget, e, onChange, triggerValue);
    };

    // ============================== Reset ===============================
    const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      handleSetValue('');
      innerRef.current?.focus();
      resolveOnChange(innerRef.current?.resizableTextArea?.textArea!, e, onChange);
    };

    const prefixCls = getPrefixCls('input', customizePrefixCls);

    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls);

    React.useImperativeHandle(ref, () => ({
      resizableTextArea: innerRef.current?.resizableTextArea,
      focus: (option?: InputFocusOptions) => {
        triggerFocus(innerRef.current?.resizableTextArea?.textArea, option);
      },
      blur: () => innerRef.current?.blur(),
    }));

    const textArea = (
      <RcTextArea
        {...omit(props, ['allowClear'])}
        disabled={mergedDisabled}
        className={classNames(
          {
            [`${prefixCls}-borderless`]: !bordered,
            [className!]: className && !showCount,
            [`${prefixCls}-sm`]: size === 'small' || customizeSize === 'small',
            [`${prefixCls}-lg`]: size === 'large' || customizeSize === 'large',
          },
          getStatusClassNames(prefixCls, mergedStatus),
          hashId,
        )}
        style={showCount ? { resize: style?.resize } : style}
        prefixCls={prefixCls}
        onCompositionStart={onInternalCompositionStart}
        onChange={handleChange}
        onCompositionEnd={onInternalCompositionEnd}
        ref={innerRef}
      />
    );

    let val = fixControlledValue(value) as string;

    if (!compositing && hasMaxLength && (props.value === null || props.value === undefined)) {
      // fix #27612 将value转为数组进行截取，解决 '😂'.length === 2 等emoji表情导致的截取乱码的问题
      val = fixEmojiLength(val, maxLength!);
    }

    // TextArea
    const textareaNode = (
      <ClearableLabeledInput
        disabled={mergedDisabled}
        {...props}
        prefixCls={prefixCls}
        direction={direction}
        inputType="text"
        value={val}
        element={textArea}
        handleReset={handleReset}
        ref={clearableInputRef}
        bordered={bordered}
        status={customStatus}
        style={showCount ? undefined : style}
        hashId={hashId}
      />
    );

    return wrapSSR(
      <div
        className={classNames(
          `${prefixCls}-container -textarea`,
          {
            [`-shape-${shape}`]: !!shape,
            [`-rtl`]: direction === 'rtl',
            '-has-suffix': !!mergedStatus,
            '-disabled': !!mergedDisabled,
          },
          getStatusClassNames('', mergedStatus, hasFeedback),
          hashId,
        )}
      >
        {!!label && <div className={`${prefixCls}-label`}>{label}</div>}
        <div className={`${prefixCls}-wrapper`}>
          {textareaNode}

          {!!mergedStatus && (
            <div className={`${prefixCls}-suffix`}>
              <Icon
                phosphorIcon={StatusIconMap[mergedStatus]}
                weight="fill"
                className={`${prefixCls}-status-icon`}
              />
            </div>
          )}
        </div>
      </div>,
    );
  },
);

export default TextArea;
