import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface FieldToken extends FullToken<'Field'> {}
const genFieldStyle: GenerateStyle<FieldToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-container`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        color: token.colorTextTertiary,
        lineHeight: token.lineHeightLG,
        overflow: 'hidden',
        position: 'relative',

        [`${componentCls}-wrapper`]: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          overflow: 'hidden',

          [`${componentCls}-content-wrapper`]: {
            overflow: 'hidden',
            flex: 1,

            [`${componentCls}-content`]: {
              marginBottom: 0,
              color: token.colorText,
            },
          },
        },

        [`&${componentCls}-placeholder`]: {
          [`${componentCls}-wrapper`]: {
            [`${componentCls}-content-wrapper`]: {
              [`${componentCls}-content`]: {
                color: token.colorTextLight4,
              },
            },
          },
        },

        [`${componentCls}-label`]: {
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          color: token.colorTextLight4,
          paddingLeft: token.paddingSM,
          paddingRight: token.paddingSM,
          paddingTop: token.paddingXXS,
          top: token.paddingXXS,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          position: 'relative',
        },

        // Size

        [`&${componentCls}-size-small`]: {
          [`${componentCls}-wrapper`]: {
            padding: `${token.paddingContentVerticalSM}px ${token.paddingContentHorizontal}px`,
          },
        },

        [`&${componentCls}-size-medium`]: {
          [`${componentCls}-wrapper`]: {
            padding: `${token.paddingContentVertical}px ${token.paddingContentHorizontal}px`,
          },
        },

        [`&${componentCls}-with-label`]: {
          [`${componentCls}-placeholder`]: {
            color: token.colorText,
          },

          [`${componentCls}-wrapper`]: {
            padding: `${token.paddingContentVertical - 2}px ${token.paddingSM}px ${
              token.paddingContentVertical
            }px`,
          },
        },

        // Border
        [`&${componentCls}-border-square`]: {
          borderRadius: 0,
        },

        [`&${componentCls}-border-round`]: {
          borderRadius: token.controlHeightLG + token.borderRadiusLG,
        },

        [`&${componentCls}-border-default`]: {
          borderRadius: token.borderRadius,
        },

        // Background
        [`&${componentCls}-bg-default`]: {
          background: token.colorBgSecondary,
        },

        [`&${componentCls}-bg-transparent`]: {
          background: 'transparent',
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Field', (token) => {
  const fieldToken = mergeToken<FieldToken>(token);
  return [genFieldStyle(fieldToken)];
});
