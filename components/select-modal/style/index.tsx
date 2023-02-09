import { resetComponent } from '../../style';
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
      [`${componentCls}-input-container`]: {
        ...resetComponent(token),
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        color: token.colorTextTertiary,
        lineHeight: token.lineHeightLG,
        overflow: 'hidden',
        position: 'relative',

        [`${componentCls}-input-wrapper`]: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          overflow: 'hidden',

          [`${componentCls}-input-content`]: {
            overflow: 'hidden',
            flex: 1,
          },
        },

        [`${componentCls}-input-label`]: {
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

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'block',
          borderWidth: token.lineWidth * 2,
          borderStyle: token.lineType,
          borderColor: token.colorTransparent,
          transition: `border-color ${token.motionDurationSlow}`,
          zIndex: 0,
        },

        '&:hover': {
          '&::before': {
            borderColor: token['geekblue-4'],
          },
        },

        [`&${componentCls}-input-disabled`]: {
          cursor: 'not-allowed',

          '&:hover': {
            '&::before': {
              borderColor: token.colorTransparent,
            },
          },
        },

        [`&${componentCls}-input-focus`]: {
          '&::before': {
            borderColor: `${token['geekblue-6']} !important`,
          },
        },

        [`${componentCls}-input-placeholder`]: {
          color: token.colorText,
          fontSize: token.fontSizeHeading6,
          lineHeight: token.lineHeightHeading6,
        },

        // Size

        [`&${componentCls}-input-size-small`]: {
          [`${componentCls}-input-wrapper`]: {
            padding: `${token.paddingContentVerticalSM}px ${token.paddingContentHorizontal}px`,
          },
        },

        [`&${componentCls}-input-size-medium`]: {
          [`${componentCls}-input-wrapper`]: {
            padding: `${token.paddingContentVertical}px ${token.paddingContentHorizontal}px`,
          },
        },

        [`&${componentCls}-input-with-label`]: {
          [`${componentCls}-input-placeholder`]: {
            color: token.colorText,
          },

          [`${componentCls}-input-wrapper`]: {
            padding: `${token.paddingContentVertical - 2}px ${token.paddingSM}px ${
              token.paddingContentVertical
            }px`,
          },
        },

        // Border
        [`&${componentCls}-input-border-square`]: {
          '&::before': {
            borderRadius: 0,
          },
          borderRadius: 0,
        },

        [`&${componentCls}-input-border-round`]: {
          '&::before': {
            borderRadius: token.controlHeightLG + token.borderRadiusLG,
          },
          borderRadius: token.controlHeightLG + token.borderRadiusLG,
        },

        [`&${componentCls}-input-border-default`]: {
          '&::before': {
            borderRadius: token.borderRadius,
          },
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
        flex: 1,
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('SelectModal', (token) => {
  const selectModalToken = mergeToken<SelectModalToken>(token);
  return [genInputStyle(selectModalToken), genItemContainerStyle(selectModalToken)];
});
