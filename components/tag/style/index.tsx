import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type React from 'react';
import type { PresetBrandColorType, PresetStatusColorType } from 'antd/es/_util/colors';
import type { FullToken, PresetColorType } from '../../theme/internal';
import { genComponentStyleHook, mergeToken, PresetColors } from '../../theme/internal';
import capitalize from '../../_util/capitalize';
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
): CSSInterpolation => {
  const capitalizedCssVariableType = capitalize<CssVariableType>(cssVariableType);
  return {
    [`${token.componentCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`color${capitalizedCssVariableType}Bg`],
      borderColor: token[`color${capitalizedCssVariableType}Border`],

      [`&${token.componentCls}-bg-gray`]: {
        background: token['gray-1'],
      },

      [`&${token.componentCls}-bg-filled`]: {
        color: token.colorText,
        background: token[`color${cssVariableType}`],
      },
    },
  };
};

// FIXME: special preset colors
const genTagColorStyle = (token: TagToken): CSSInterpolation =>
  PresetColors.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
    const lightColor = token[`${colorKey}-1`];
    const lightBorderColor = token[`${colorKey}-3`];
    const darkColor = token[`${colorKey}-6`];
    const textColor = token[`${colorKey}-7`];
    return {
      ...prev,
      [`${token.componentCls}-${colorKey}`]: {
        color: textColor,
        background: lightColor,
        borderColor: lightBorderColor,

        [`&${token.componentCls}-bg-gray`]: {
          background: token['gray-1'],
        },

        [`&${token.componentCls}-bg-filled`]: {
          color: token.colorText,
          background: darkColor,
        },
      },
      [`${token.componentCls}-${colorKey}-inverse`]: {
        color: token.colorTextLightSolid,
        background: darkColor,
        borderColor: darkColor,
      },
    };
  }, {} as CSSObject);

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
      paddingInline,
      fontSize: token.tagFontSize,
      lineHeight: `${token.tagLineHeight}px`,
      whiteSpace: 'nowrap',
      background: token.tagDefaultBg,
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
      '&-shape-rounded': {
        borderRadius: `${token.tagLineHeight}px`,
      },
      '&-shape-square': {
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
