import type { CSSInterpolation } from '@ant-design/cssinjs';
import type React from 'react';
import type { PresetBrandColorType, PresetStatusColorType } from '../../_util/colors';
import type { FullToken, PresetColorType } from '../../theme/internal';
import { genComponentStyleHook, mergeToken, PresetColors } from '../../theme/internal';
import { resetComponent } from '../../style';

export interface ComponentToken {}

interface TagToken extends FullToken<'Tag'> {
  tagFontSize: number;
  tagLineHeight: React.CSSProperties['lineHeight'];
  tagDefaultBg: string;
  tagDefaultColor: string;
  tagIconSize: number;
  tagPaddingHorizontal: number;
}

// ============================== Styles ==============================

type CssVariableType = 'Success' | 'Info' | 'Error' | 'Warning' | 'Primary' | 'Secondary';

const genTagStatusStyle = (
  token: TagToken,
  status: PresetBrandColorType | PresetStatusColorType,
  cssVariableType: CssVariableType,
): CSSInterpolation => ({
  [`${token.componentCls}-${status}`]: {
    position: 'relative',
    color: token[`color${cssVariableType}`],
    '&::before': {
      content: "''",
      backgroundColor: token[`color${cssVariableType}`],
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderRadius: token.borderRadiusLG,
      top: 0,
      left: 0,
      zIndex: 1,
      opacity: 0.1,
    },

    [`&${token.componentCls}-bg-gray`]: {
      '&::before': {
        backgroundColor: token['gray-1'],
      },
    },

    [`&${token.componentCls}-bg-filled`]: {
      color: token.colorText,
      background: token[`color${cssVariableType}`],
    },
  },
});

// FIXME: special preset colors
const genTagColorStyle = (token: TagToken): CSSInterpolation =>
  PresetColors.reduce((prev: CSSInterpolation, colorKey: keyof PresetColorType) => {
    const textColor = token[`${colorKey}-6`];
    // @ts-ignore
    return {
      ...prev,
      [`${token.componentCls}-${colorKey}`]: {
        position: 'relative',
        color: textColor,
        '&::before': {
          content: "''",
          backgroundColor: textColor,
          width: '100%',
          height: '100%',
          position: 'absolute',
          borderRadius: token.borderRadiusLG,
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: 0.1,
        },

        [`&${token.componentCls}-bg-gray`]: {
          '&::before': {
            backgroundColor: token['gray-1'],
          },
        },

        [`&${token.componentCls}-bg-filled`]: {
          color: token.colorText,
          background: textColor,
        },
      },
      [`${token.componentCls}-${colorKey}-inverse`]: {
        color: token.colorTextLightSolid,
        background: textColor,
        borderColor: textColor,
      },
    };
  }, {} as CSSInterpolation);

const genBaseStyle = (token: TagToken): CSSInterpolation => {
  const { paddingXXS, lineWidth, tagPaddingHorizontal } = token;
  const paddingInline = tagPaddingHorizontal - lineWidth;
  const iconMarginInline = paddingXXS - lineWidth;
  return {
    // Result
    [token.componentCls]: {
      ...resetComponent(token),
      display: 'inline-block',
      height: 'auto',
      marginInlineEnd: token.marginXS,
      padding: '2px 8px',
      fontSize: token.fontSizeXS,
      lineHeight: token.lineHeightXS,
      whiteSpace: 'nowrap',
      background: 'transparent',
      border: 0,
      borderRadius: token.borderRadiusLG,
      opacity: 1,
      transition: `all ${token.motionDurationMid}`,
      textAlign: 'start',
      fontWeight: 600,

      // RTL
      '&&-rtl': {
        direction: 'rtl',
      },

      '&, a, a:hover': {
        color: token.tagDefaultColor,
      },

      [`${token.componentCls}-close-icon`]: {
        marginInlineStart: iconMarginInline,
        color: token.colorTextDescription,
        fontSize: token.tagIconSize,
        cursor: 'pointer',
        transition: `all ${token.motionDurationMid}`,

        '&:hover': {
          color: token.colorTextHeading,
        },
      },

      [`&${token.componentCls}-bg-gray`]: {
        background: token['gray-1'],
      },

      [`&&-has-color`]: {
        borderColor: 'transparent',

        [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
          color: token.colorTextLightSolid,
        },
      },

      [`&-checkable`]: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        cursor: 'pointer',

        '&:not(&-checked):hover': {
          color: token.colorPrimary,
          backgroundColor: token.colorFillSecondary,
        },

        '&:active, &-checked': {
          color: token.colorTextLightSolid,
        },

        '&-checked': {
          backgroundColor: token.colorPrimary,
          '&:hover': {
            backgroundColor: token.colorPrimaryHover,
          },
        },

        '&:active': {
          backgroundColor: token.colorPrimaryActive,
        },
      },

      [`&-hidden`]: {
        display: 'none',
      },

      // To ensure that a space will be placed between character and `Icon`.
      [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
        marginInlineStart: paddingInline,
      },

      // Shape
      '&-shape-round': {
        '&&::before': {
          borderRadius: `${token.tagLineHeight}px`,
        },
        borderRadius: `${token.tagLineHeight}px`,
      },
      '&-shape-square': {
        '&&::before': {
          borderRadius: 0,
        },
        borderRadius: 0,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Tag', (token) => {
  const { fontSize, lineHeight, fontSizeIcon } = token;
  const tagHeight = Math.round(fontSize * lineHeight);

  const tagFontSize = token.fontSizeXS;
  const tagLineHeight = tagHeight;
  const tagDefaultBg = token.colorFillAlter;
  const tagDefaultColor = token.colorText;

  const tagToken = mergeToken<TagToken>(token, {
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
    tagIconSize: fontSizeIcon, // Tag icon is much more smaller
    tagPaddingHorizontal: 8, // Fixed padding.
  });

  return [
    genBaseStyle(tagToken),
    genTagColorStyle(tagToken),
    genTagStatusStyle(tagToken, 'primary', 'Primary'),
    genTagStatusStyle(tagToken, 'secondary', 'Secondary'),
    genTagStatusStyle(tagToken, 'success', 'Success'),
    genTagStatusStyle(tagToken, 'processing', 'Info'),
    genTagStatusStyle(tagToken, 'error', 'Error'),
    genTagStatusStyle(tagToken, 'warning', 'Warning'),
  ];
});
