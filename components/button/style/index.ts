import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { genFocusStyle } from '../../style';

const buttonSizes = ['xs', 'sm', 'md', 'lg'] as const;

type ButtonSize = typeof buttonSizes[number];

const buttonSizeMap: Record<ButtonSize, number> = {
  xs: 40,
  sm: 48,
  md: 52,
  lg: 64,
};

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

export interface ButtonToken extends FullToken<'Button'> {
  // FIXME: should be removed
  colorOutlineDefault: string;
  buttonPaddingHorizontal: number;
}

// ============================== Shared ==============================
const genSharedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token): CSSObject => {
  const { componentCls, iconCls } = token;

  return {
    [componentCls]: {
      outline: 'none',
      position: 'relative',
      display: 'inline-flex',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      backgroundImage: 'none',
      backgroundColor: 'transparent',
      border: 0,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',
      padding: '0 16px',
      color: token.colorText,
      fontSize: token.fontSizeLG,
      height: buttonSizeMap.md,
      lineHeight: `${buttonSizeMap.md}px`,
      alignItems: 'center',
      justifyContent: 'center',

      [`&${componentCls}-block`]: {
        width: '100%',
      },

      '> span': {
        display: 'inline-block',
      },

      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: token.marginXS,
      },

      '&:not(:disabled)': {
        ...genFocusStyle(token),
      },

      // make `btn-icon-only` not too narrow
      '&-compact-item.-icon-only': {
        flex: 'none',
      },

      [`&.-icon-only`]: {
        paddingInlineStart: 0,
        paddingInlineEnd: 0,
        width: buttonSizeMap.md,
      },

      [`&.-content-align-left:not(.-icon-only)`]: {
        justifyContent: 'flex-start',
      },

      '.anticon': {
        height: 28,
        width: 28,
        fontSize: 28,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      // Loading
      [`&${componentCls}-loading`]: {
        opacity: token.opacityLoading,
        cursor: 'default',
      },

      [`${componentCls}-loading-icon`]: {
        display: 'inline-flex',
        transition: `width ${token.motionDurationSlow} ${token.motionEaseInOut}, opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
      },

      [`&:not(.-icon-only) ${componentCls}-loading-icon > ${iconCls}`]: {
        marginInlineEnd: token.marginXS,
      },

      '&.-disabled,&:disabled': {
        cursor: 'not-allowed',
      },
    },
  };
};

// =============================== Type ===============================
const genTypeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-default`]: {
      backgroundColor: token.colorBgContainer,
    },
  };
};

// =============================== Size ===============================
const genSizeButtonStyle = (token: ButtonToken, size: ButtonSize): CSSInterpolation => {
  const { componentCls } = token;

  if (size === 'xs') {
    return [
      {
        [`${componentCls}.-size-xs`]: {
          fontSize: token.fontSize,
          height: buttonSizeMap[size],
          lineHeight: `${buttonSizeMap[size]}px`,

          [`&.-icon-only`]: {
            width: buttonSizeMap[size],
            '.anticon': {
              height: 24,
              width: 24,
              fontSize: 22,
            },
          },
        },
      },
    ];
  }

  return [
    {
      [`${componentCls}.-size-${size}`]: {
        height: buttonSizeMap[size],
        lineHeight: `${buttonSizeMap[size]}px`,

        [`&.-icon-only`]: {
          width: buttonSizeMap[size],
        },
      },
    },
  ];
};

const genSizeButtonStyles = (token: ButtonToken) => {
  const styles: CSSInterpolation[] = [];

  buttonSizes.forEach((size) => {
    styles.push(genSizeButtonStyle(token, size));
  });

  return styles;
};

// ============================== Shape ===============================
const genButtonShapeStyles: GenerateStyle<ButtonToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-default`]: {
      '&.-shape-default': {
        borderRadius: token.borderRadiusLG,
      },

      '&.-shape-square': {
        borderRadius: 0,
      },

      '&.-shape-round, &.-shape-circle': {
        borderRadius: buttonSizeMap.md,

        '&.-size-xs': {
          borderRadius: buttonSizeMap.xs,
        },
        '&.-size-sm': {
          borderRadius: buttonSizeMap.sm,
        },
        '&.-size-md': {
          borderRadius: buttonSizeMap.md,
        },
        '&.-size-lg': {
          borderRadius: buttonSizeMap.lg,
        },
      },
    },
  };
};

// ============================== Schema ===============================
const genSchemaStyle = (backgroundColor: string, color: string): CSSObject => ({
  backgroundColor,
  color,
});

const genSchemaStyles: GenerateStyle<ButtonToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-default`]: {
      '&.-schema-primary': {
        ...genSchemaStyle(token.colorPrimary, token.colorTextLight1),
        '&:hover': genSchemaStyle(token.colorPrimaryHover, token.colorTextLight1),
        '&:active': genSchemaStyle(token.colorPrimaryActive, token.colorTextLight1),
        '&.-disabled, &:disabled': genSchemaStyle(token.colorPrimaryActive, token.colorTextLight5),
      },

      '&.-schema-secondary': {
        ...genSchemaStyle(token['gray-1'], token.colorTextLight1),
        '&:hover': genSchemaStyle(token['gray-2'], token.colorTextLight1),
        '&:active': genSchemaStyle(token['gray-1'], token.colorTextLight1),
        '&.-disabled, &:disabled': genSchemaStyle(token['gray-1'], token.colorTextLight5),
      },

      '&.-schema-warning': {
        ...genSchemaStyle(token['yellow-6'], token.colorTextDark2),
        '&:hover': genSchemaStyle(token['yellow-7'], token.colorTextDark2),
        '&:active': genSchemaStyle(token['yellow-8'], token.colorTextDark2),
        '&.-disabled, &:disabled': genSchemaStyle(token['yellow-4'], token.colorTextDark5),
      },

      '&.-schema-danger, &.-schema-error': {
        ...genSchemaStyle(token['red-6'], token.colorTextLight1),
        '&:hover': genSchemaStyle(token['red-7'], token.colorTextLight1),
        '&:active': genSchemaStyle(token['red-4'], token.colorTextLight1),
        '&.-disabled, &:disabled': genSchemaStyle(token['red-4'], token.colorTextLight5),
      },
    },
    [`${componentCls}-ghost`]: {
      [`&.-icon-only`]: {
        color: token.colorTextBase,
      },

      [`&:not(.-icon-only)`]: {
        color: token.colorTextBase,
        opacity: 0.45,

        '&:hover': {
          opacity: 0.85,
        },
        '&:active': {
          opacity: 0.65,
        },
        '&.-disabled, &:disabled': {
          opacity: 0.3,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Button', (token) => {
  const { controlTmpOutline, paddingContentHorizontal } = token;

  const buttonToken = mergeToken<ButtonToken>(token, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal,
  });

  return [
    // Shared
    genSharedButtonStyle(buttonToken),

    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(buttonToken),

    // Size
    genSizeButtonStyles(buttonToken),

    // Shape
    genButtonShapeStyles(buttonToken),

    // Schema
    genSchemaStyles(buttonToken),
  ];
});
