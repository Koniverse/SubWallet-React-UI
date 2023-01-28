import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { GlobalToken } from '../../theme/interface';
import { clearFix, resetComponent } from '../../style';

export type InputToken<T extends GlobalToken = FullToken<'Input'>> = T & {
  inputAffixPadding: number;
  inputPaddingVertical: number;
  inputPaddingVerticalLG: number;
  inputPaddingVerticalSM: number;
  inputPaddingHorizontal: number;
  inputPaddingHorizontalLG: number;
  inputPaddingHorizontalSM: number;
  inputBorderHoverColor: string;
  inputBorderActiveColor: string;
};

export const genPlaceholderStyle = (color: string): CSSObject => ({
  // Firefox
  '&::-moz-placeholder': {
    opacity: 1,
  },
  '&::placeholder': {
    color,
    userSelect: 'none', // https://github.com/ant-design/ant-design/pull/32639
  },
  '&:placeholder-shown': {
    textOverflow: 'ellipsis',
  },
});

export const genHoverStyle = (token: InputToken): CSSObject => ({
  borderColor: token.inputBorderHoverColor,
  borderInlineEndWidth: token.lineWidth,
});

export const genActiveStyle = (token: InputToken) => ({
  borderColor: token.inputBorderHoverColor,
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
  borderInlineEndWidth: token.lineWidth,
  outline: 0,
});

export const genDisabledStyle = (token: InputToken): CSSObject => ({
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  boxShadow: 'none',
  cursor: 'not-allowed',
  opacity: 1,

  '&:hover': {
    ...genHoverStyle(mergeToken<InputToken>(token, { inputBorderHoverColor: token.colorBorder })),
  },
});

const genInputLargeStyle = (token: InputToken): CSSObject => {
  const {
    inputPaddingVerticalLG,
    fontSizeLG,
    lineHeightLG,
    borderRadiusLG,
    inputPaddingHorizontalLG,
  } = token;

  return {
    padding: `${inputPaddingVerticalLG}px ${inputPaddingHorizontalLG}px`,
    fontSize: fontSizeLG,
    lineHeight: lineHeightLG,
    borderRadius: borderRadiusLG,
  };
};

export const genInputSmallStyle = (token: InputToken): CSSObject => ({
  padding: `${token.inputPaddingVerticalSM}px ${token.controlPaddingHorizontalSM - 1}px`,
  borderRadius: token.borderRadiusSM,
});

export const genStatusStyle = (token: InputToken): CSSObject => {
  const {
    componentCls,
    colorError,
    colorWarning,
    colorErrorOutline,
    colorWarningOutline,
    colorErrorBorderHover,
    colorWarningBorderHover,
  } = token;

  return {
    '&-status-error:not(&-disabled):not(&-borderless)&': {
      borderColor: colorError,

      '&:hover': {
        borderColor: colorErrorBorderHover,
      },

      '&:focus, &-focused': {
        ...genActiveStyle(
          mergeToken<InputToken>(token, {
            inputBorderActiveColor: colorError,
            inputBorderHoverColor: colorError,
            controlOutline: colorErrorOutline,
          }),
        ),
      },

      [`${componentCls}-prefix`]: {
        color: colorError,
      },
    },
    '&-status-warning:not(&-disabled):not(&-borderless)&': {
      borderColor: colorWarning,

      '&:hover': {
        borderColor: colorWarningBorderHover,
      },

      '&:focus, &-focused': {
        ...genActiveStyle(
          mergeToken<InputToken>(token, {
            inputBorderActiveColor: colorWarning,
            inputBorderHoverColor: colorWarning,
            controlOutline: colorWarningOutline,
          }),
        ),
      },

      [`${componentCls}-prefix`]: {
        color: colorWarning,
      },
    },
  };
};

export const genBasicInputStyle = (token: InputToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  minWidth: 0,
  padding: `${token.inputPaddingVertical}px ${token.inputPaddingHorizontal}px`,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  backgroundColor: token.colorBgContainer,
  backgroundImage: 'none',
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: token.colorBorder,
  borderRadius: token.borderRadius,
  transition: `all ${token.motionDurationMid}`,
  ...genPlaceholderStyle(token.colorTextPlaceholder),

  '&:hover': {
    ...genHoverStyle(token),
  },

  '&:focus, &-focused': {
    ...genActiveStyle(token),
  },

  '&-disabled, &[disabled]': {
    ...genDisabledStyle(token),
  },

  '&-borderless': {
    '&, &:hover, &:focus, &-focused, &-disabled, &[disabled]': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  },

  // Reset height for `textarea`s
  'textarea&': {
    maxWidth: '100%', // prevent textearea resize from coming out of its container
    height: 'auto',
    minHeight: token.controlHeight,
    lineHeight: token.lineHeight,
    verticalAlign: 'bottom',
    transition: `all ${token.motionDurationSlow}, height 0s`,
    resize: 'vertical',
  },

  // Size
  '&-lg': {
    ...genInputLargeStyle(token),
  },
  '&-sm': {
    ...genInputSmallStyle(token),
  },

  // RTL
  '&-rtl': {
    direction: 'rtl',
  },

  '&-textarea-rtl': {
    direction: 'rtl',
  },
});

export const genInputGroupStyle = (token: InputToken): CSSObject => {
  const { componentCls, antCls } = token;

  return {
    position: 'relative',
    display: 'table',
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,

    // Undo padding and float of grid classes
    [`&[class*='col-']`]: {
      paddingInlineEnd: token.paddingXS,

      '&:last-child': {
        paddingInlineEnd: 0,
      },
    },

    // Sizing options
    [`&-lg ${componentCls}, &-lg > ${componentCls}-group-addon`]: {
      ...genInputLargeStyle(token),
    },

    [`&-sm ${componentCls}, &-sm > ${componentCls}-group-addon`]: {
      ...genInputSmallStyle(token),
    },

    // Fix https://github.com/ant-design/ant-design/issues/5754
    [`&-lg ${antCls}-select-single ${antCls}-select-selector`]: {
      height: token.controlHeightLG,
    },

    [`&-sm ${antCls}-select-single ${antCls}-select-selector`]: {
      height: token.controlHeightSM,
    },

    [`> ${componentCls}`]: {
      display: 'table-cell',

      '&:not(:first-child):not(:last-child)': {
        borderRadius: 0,
      },
    },

    [`${componentCls}-group`]: {
      [`&-addon, &-wrap`]: {
        display: 'table-cell',
        width: 1,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',

        '&:not(:first-child):not(:last-child)': {
          borderRadius: 0,
        },
      },

      '&-wrap > *': {
        display: 'block !important',
      },

      '&-addon': {
        position: 'relative',
        padding: `0 ${token.inputPaddingHorizontal}px`,
        color: token.colorText,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        textAlign: 'center',
        backgroundColor: token.colorFillAlter,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        transition: `all ${token.motionDurationSlow}`,
        lineHeight: 1,

        // Reset Select's style in addon
        [`${antCls}-select`]: {
          margin: `-${token.inputPaddingVertical + 1}px -${token.inputPaddingHorizontal}px`,

          [`&${antCls}-select-single:not(${antCls}-select-customize-input)`]: {
            [`${antCls}-select-selector`]: {
              backgroundColor: 'inherit',
              border: `${token.lineWidth}px ${token.lineType} transparent`,
              boxShadow: 'none',
            },
          },

          '&-open, &-focused': {
            [`${antCls}-select-selector`]: {
              color: token.colorPrimary,
            },
          },
        },

        // https://github.com/ant-design/ant-design/issues/31333
        [`${antCls}-cascader-picker`]: {
          margin: `-9px -${token.inputPaddingHorizontal}px`,
          backgroundColor: 'transparent',
          [`${antCls}-cascader-input`]: {
            textAlign: 'start',
            border: 0,
            boxShadow: 'none',
          },
        },
      },

      '&-addon:first-child': {
        borderInlineEnd: 0,
      },

      '&-addon:last-child': {
        borderInlineStart: 0,
      },
    },

    [`${componentCls}`]: {
      float: 'inline-start',
      width: '100%',
      marginBottom: 0,
      textAlign: 'inherit',

      '&:focus': {
        zIndex: 1, // Fix https://gw.alipayobjects.com/zos/rmsportal/DHNpoqfMXSfrSnlZvhsJ.png
        borderInlineEndWidth: 1,
      },

      '&:hover': {
        zIndex: 1,
        borderInlineEndWidth: 1,

        [`${componentCls}-search-with-button &`]: {
          zIndex: 0,
        },
      },
    },

    // Reset rounded corners
    [`> ${componentCls}:first-child, ${componentCls}-group-addon:first-child`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,

      // Reset Select's style in addon
      [`${antCls}-select ${antCls}-select-selector`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`> ${componentCls}-affix-wrapper`]: {
      [`&:not(:first-child) ${componentCls}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },

      [`&:not(:last-child) ${componentCls}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`> ${componentCls}:last-child, ${componentCls}-group-addon:last-child`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,

      // Reset Select's style in addon
      [`${antCls}-select ${antCls}-select-selector`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    [`${componentCls}-affix-wrapper`]: {
      '&:not(:last-child)': {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`${componentCls}-search &`]: {
          borderStartStartRadius: token.borderRadius,
          borderEndStartRadius: token.borderRadius,
        },
      },

      [`&:not(:first-child), ${componentCls}-search &:not(:first-child)`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    '&&-compact': {
      display: 'block',
      ...clearFix(),

      [`${componentCls}-group-addon, ${componentCls}-group-wrap, > ${componentCls}`]: {
        '&:not(:first-child):not(:last-child)': {
          borderInlineEndWidth: token.lineWidth,

          '&:hover': {
            zIndex: 1,
          },

          '&:focus': {
            zIndex: 1,
          },
        },
      },

      '& > *': {
        display: 'inline-block',
        float: 'none',
        verticalAlign: 'top', // https://github.com/ant-design/ant-design-pro/issues/139
        borderRadius: 0,
      },

      [`& > ${componentCls}-affix-wrapper`]: {
        display: 'inline-flex',
      },

      [`& > ${antCls}-picker-range`]: {
        display: 'inline-flex',
      },

      '& > *:not(:last-child)': {
        marginInlineEnd: -token.lineWidth,
        borderInlineEndWidth: token.lineWidth,
      },

      // Undo float for .ant-input-group .ant-input
      [`${componentCls}`]: {
        float: 'none',
      },

      // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
      [`& > ${antCls}-select > ${antCls}-select-selector,
      & > ${antCls}-select-auto-complete ${componentCls},
      & > ${antCls}-cascader-picker ${componentCls},
      & > ${componentCls}-group-wrapper ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderRadius: 0,

        '&:hover': {
          zIndex: 1,
        },

        '&:focus': {
          zIndex: 1,
        },
      },

      [`& > ${antCls}-select-focused`]: {
        zIndex: 1,
      },

      // update z-index for arrow icon
      [`& > ${antCls}-select > ${antCls}-select-arrow`]: {
        zIndex: 1, // https://github.com/ant-design/ant-design/issues/20371
      },

      [`& > *:first-child,
      & > ${antCls}-select:first-child > ${antCls}-select-selector,
      & > ${antCls}-select-auto-complete:first-child ${componentCls},
      & > ${antCls}-cascader-picker:first-child ${componentCls}`]: {
        borderStartStartRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius,
      },

      [`& > *:last-child,
      & > ${antCls}-select:last-child > ${antCls}-select-selector,
      & > ${antCls}-cascader-picker:last-child ${componentCls},
      & > ${antCls}-cascader-picker-focused:last-child ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderStartEndRadius: token.borderRadius,
        borderEndEndRadius: token.borderRadius,
      },

      // https://github.com/ant-design/ant-design/issues/12493
      [`& > ${antCls}-select-auto-complete ${componentCls}`]: {
        verticalAlign: 'top',
      },

      [`${componentCls}-group-wrapper + ${componentCls}-group-wrapper`]: {
        marginInlineStart: -token.lineWidth,
        [`${componentCls}-affix-wrapper`]: {
          borderRadius: 0,
        },
      },

      [`${componentCls}-group-wrapper:not(:last-child)`]: {
        [`&${componentCls}-search > ${componentCls}-group`]: {
          [`& > ${componentCls}-group-addon > ${componentCls}-search-button`]: {
            borderRadius: 0,
          },

          [`& > ${componentCls}`]: {
            borderStartStartRadius: token.borderRadius,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            borderEndStartRadius: token.borderRadius,
          },
        },
      },
    },
  };
};

const genInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-container`]: {
      ...resetComponent(token),
      backgroundColor: token.colorBgSecondary,
      position: 'relative',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'block',
        border: '2px solid transparent',
        transition: `border-color ${token.motionDurationSlow}`,
        zIndex: 0,
      },

      '&.-shape-default, &.-shape-default:before': {
        borderRadius: token.borderRadiusLG,
      },

      '&.-shape-round, &.-shape-round:before': {
        borderRadius: 48,
      },

      '&.-has-label': {
        '&.-shape-round, &.-shape-round:before': {
          borderRadius: token.borderRadiusLG,
        },
      },

      [`${componentCls}`]: {
        backgroundColor: 'transparent',
        border: 0,
        outline: 'none',
        padding: 0,
        flexGrow: 1,
        fontWeight: 'inherit',
        height: 48,
        paddingBottom: 12,
        paddingTop: 12,
      },

      [`${componentCls}-clear-icon`]: {
        order: 99,
      },

      [`${componentCls}-clear-icon-hidden`]: {
        display: 'none',
      },

      [`${componentCls}-affix-wrapper`]: {
        display: 'flex',
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
      },

      [`${componentCls}-suffix, ${componentCls}-prefix`]: {
        color: token.colorTextLight4,
        display: 'flex',
        alignItems: 'center',
      },

      [`${componentCls}-prefix`]: {
        paddingRight: 8,
      },

      [`${componentCls}-suffix`]: {
        height: 48,
        marginRight: -8,
      },

      [`${componentCls}-status-icon`]: {
        fontSize: 20,
        marginLeft: 8,
        marginRight: 8,
      },

      [`.__input-action`]: {
        display: 'flex',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: `color ${token.motionDurationSlow}`,
        fontSize: 24,

        '&:hover': {
          color: token.colorTextLight2,
        },
      },

      [`${componentCls}-label`]: {
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeightSM,
        color: token.colorTextLight4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        top: 4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        position: 'relative',
      },

      [`${componentCls}-wrapper`]: {
        display: 'flex',
        position: 'relative',
        zIndex: 2,

        [`> input`]: {
          paddingLeft: 12,
          paddingRight: 12,
        },
      },

      '&:hover:before': {
        borderColor: token['geekblue-4'],
      },

      '&:focus-within:before': {
        borderColor: token['geekblue-6'],
      },

      '&.-status-warning': {
        '&:before': {
          borderColor: token.colorWarning,
        },

        [`${componentCls}-status-icon`]: {
          color: token.colorWarning,
        },
      },

      '&.-status-error': {
        '&:before': {
          borderColor: token.colorError,
        },

        [`${componentCls}-status-icon`]: {
          color: token.colorError,
        },
      },

      '&.-status-success.-display-success-status': {
        '&:before': {
          borderColor: token.colorSuccess,
        },

        [`${componentCls}-status-icon`]: {
          color: token.colorSuccess,
        },
      },

      '&.-disabled': {
        '&:before': {
          borderColor: 'transparent',
        },

        [`&, ${componentCls}, .__input-action`]: {
          cursor: 'not-allowed',
        },

        [`${componentCls}`]: {
          cursor: 'not-allowed',
          color: token.colorTextLight5,
        },

        '.__input-action': {
          color: 'inherit',
        },
      },
    },
  };
};

const genSearchInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-container.-search`]: {
      [`${componentCls}-prefix`]: {
        color: token.colorTextLight2,
      },
    },
  };
};

export function initInputToken<T extends GlobalToken = GlobalToken>(token: T): InputToken<T> {
  // @ts-ignore
  return mergeToken<InputToken<T>>(token, {
    inputAffixPadding: token.paddingXXS,
    inputPaddingVertical: Math.max(
      Math.round(((token.controlHeight - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
        token.lineWidth,
      3,
    ),
    inputPaddingVerticalLG:
      Math.ceil(((token.controlHeightLG - token.fontSizeLG * token.lineHeightLG) / 2) * 10) / 10 -
      token.lineWidth,
    inputPaddingVerticalSM: Math.max(
      Math.round(((token.controlHeightSM - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
        token.lineWidth,
      0,
    ),
    inputPaddingHorizontal: token.paddingSM - token.lineWidth,
    inputPaddingHorizontalSM: token.paddingXS - token.lineWidth,
    inputPaddingHorizontalLG: token.controlPaddingHorizontal - token.lineWidth,
    inputBorderHoverColor: token.colorPrimaryHover,
    inputBorderActiveColor: token.colorPrimaryHover,
  });
}

const genTextAreaStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-container.-textarea`]: {
      '&.-shape-round, &.-shape-round:before': {
        borderRadius: token.borderRadiusLG,
      },

      [`${componentCls}-label`]: {
        paddingTop: 8,
        top: 0,
      },

      [`${componentCls}`]: {
        height: 'auto',
        minHeight: 52,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        border: '2px solid transparent',
      },

      [`&.-has-suffix ${componentCls}`]: {
        paddingRight: 40,
      },

      [`${componentCls}-suffix`]: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingRight: 12,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Input', (token) => {
  const inputToken = initInputToken<FullToken<'Input'>>(token);

  return [genInputStyle(inputToken), genTextAreaStyle(inputToken), genSearchInputStyle(inputToken)];
});
