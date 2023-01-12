import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface SelectModalToken extends FullToken<'SelectModal'> {}
const genInputStyle: GenerateStyle<SelectModalToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-input`]: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        color: token.colorTextTertiary,
        lineHeight: token.lineHeightLG,
        borderWidth: token.lineWidth * 2,
        borderStyle: token.lineType,
        overflow: 'hidden',

        [`${componentCls}-input-content`]: {
          overflow: 'hidden',
        },

        '&:hover': {
          borderColor: `${token['geekblue-4']} !important`,
        },

        [`&${componentCls}-input-focus`]: {
          borderColor: `${token['geekblue-6']} !important`,
        },

        [`${componentCls}-input-placeholder`]: {
          color: token.colorTextPlaceholder,
          fontSize: token.fontSizeLG,
        },

        // Size
        [`&${componentCls}-input-size-default`]: {
          padding: `${token.paddingContentVertical - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        [`&${componentCls}-input-size-small`]: {
          padding: `${token.paddingContentVerticalSM - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        [`&${componentCls}-input-size-medium`]: {
          padding: `${token.paddingContentVertical - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        [`&${componentCls}-input-size-large`]: {
          padding: `${token.paddingContentVerticalLG - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        // Border
        [`&${componentCls}-input-border-square`]: {
          borderRadius: 0,
        },

        [`&${componentCls}-input-border-round`]: {
          [`&${componentCls}-input-size-default`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVertical * 2,
          },

          [`&${componentCls}-input-size-small`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVerticalSM * 2,
          },

          [`&${componentCls}-input-size-medium`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVertical * 2,
          },

          [`&${componentCls}-input-size-large`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVerticalLG * 2,
          },
        },

        [`&${componentCls}-input-border-default`]: {
          borderRadius: token.borderRadius,
        },

        // Background
        [`&${componentCls}-input-bg-default`]: {
          background: token.colorBgSecondary,
          borderColor: token.colorBgSecondary,
        },

        [`&${componentCls}-input-bg-transparent`]: {
          background: 'transparent',
          borderColor: 'transparent',
        },
      },
    },
  ];
};

const genItemContainerStyle: GenerateStyle<SelectModalToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-item-container`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: token.paddingContentVerticalSM,

        [`${componentCls}-item`]: {
          cursor: 'pointer',
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('SelectModal', (token) => {
  const selectModalToken = mergeToken<SelectModalToken>(token);
  return [genInputStyle(selectModalToken), genItemContainerStyle(selectModalToken)];
});
