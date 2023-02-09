import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface SwHeaderToken extends FullToken<'SwHeader'> {
  // Custom token here
}
const genContainerStyle: GenerateStyle<SwHeaderToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-container`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: 40,
        height: 'max-content',

        [`${componentCls}-left-part`]: {
          flexShrink: 1,
          marginLeft: token.paddingXS,
        },

        [`${componentCls}-left-part-min-width`]: {
          minWidth: token.controlHeightLG,
          flexShrink: 1,
          marginLeft: token.paddingXS,
        },

        [`${componentCls}-right-part`]: {
          flexShrink: 1,
          marginRight: token.paddingXS,

          [`&${componentCls}-right-part-no-content`]: {
            marginRight: 0,
          },

          [`&${componentCls}-right-part-min-width`]: {
            minWidth: token.controlHeightLG,
            marginRight: token.paddingXS,
          },
        },

        [`${componentCls}-center-part`]: {
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          flex: 1,
          alignItems: 'center',
        },
      },

      [`${componentCls}-container-center`]: {
        [`${componentCls}-center-part`]: {
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 'auto',
          width: 246,
        },
      },

      [`${componentCls}-container-padding-vertical`]: {
        paddingTop: token.paddingXS,
        paddingBottom: token.paddingXS,
      },

      [`${componentCls}-bg-default`]: {
        backgroundColor: token.colorBgSecondary,
      },

      [`${componentCls}-bg-transparent`]: {
        backgroundColor: token.colorTransparent,
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('SwHeader', (token) => {
  const swHeaderToken = mergeToken<SwHeaderToken>(token);
  return [genContainerStyle(swHeaderToken)];
});
