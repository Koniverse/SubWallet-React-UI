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
      '&-icon-only&-compact-item': {
        flex: 'none',
      },

      [`&-icon-only`]: {
        paddingInlineStart: 0,
        paddingInlineEnd: 0,
        width: buttonSizeMap.md,

        // todo: icon may have different class name
        '.anticon': {
          height: 24,
          width: 24,
          fontSize: 24,
        },
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

      [`&:not(&-icon-only) ${componentCls}-loading-icon > ${iconCls}`]: {
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
  const iconOnlyCls = `${componentCls}-icon-only`;

  return [
    {
      [`${componentCls}.-size-${size}`]: {
        height: buttonSizeMap[size],
        lineHeight: `${buttonSizeMap[size]}px`,

        [`&${iconOnlyCls}`]: {
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

      '&.-shape-rounded, &.-shape-circle': {
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

  console.log('tokentokentoken', token);
  return {
    [`${componentCls}-default`]: {
      '&.-schema-primary': {
        ...genSchemaStyle(token.colorPrimary, token.colorTextLight1),
        '&:hover': genSchemaStyle(token.colorPrimaryHover, token.colorTextLight1),
        '&:active': genSchemaStyle(token.colorPrimaryActive, token.colorTextLight1),
        '&.-disabled, &:disabled': genSchemaStyle(token.colorPrimaryActive, token.colorTextLight5),
      },

      '&.-schema-secondary': {
        ...genSchemaStyle(token['gray-1'], token.colorSecondary),
        '&:hover': genSchemaStyle(token['gray-2'], token.colorTextLight1),
        '&:active': genSchemaStyle(token['gray-1'], token.colorTextLight1),
        '&.-disabled, &:disabled': genSchemaStyle(token['gray-1'], token.colorTextLight5),
      },

      '&.-schema-warning': {
        ...genSchemaStyle(token.colorWarning, token.colorTextDark2),
        '&:hover': genSchemaStyle(token.colorWarningHover, token.colorTextDark2),
        '&:active': genSchemaStyle(token.colorWarningActive, token.colorTextDark2),
        '&.-disabled, &:disabled': genSchemaStyle(token.colorWarningActive, token.colorTextDark5),
      },

      '&.-schema-danger, &.-schema-error': {
        ...genSchemaStyle(token.colorError, token.colorTextLight1),
        '&:hover': genSchemaStyle(token.colorErrorHover, token.colorTextLight1),
        '&:active': genSchemaStyle(token.colorErrorActive, token.colorTextLight1),
        '&.-disabled, &:disabled': genSchemaStyle(token.colorErrorActive, token.colorTextLight5),
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
