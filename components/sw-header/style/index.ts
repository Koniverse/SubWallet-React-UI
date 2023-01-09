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
        padding: token.paddingSM,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: token.marginXS,

        [`${componentCls}-left-part`]: {
          flexShrink: 1,
        },
        [`${componentCls}-right-part`]: {
          flexShrink: 1,
        },
      },

      [`${componentCls}-container-merged`]: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 0,
        [`${componentCls}-center-part`]: {
          flexGrow: 1,
        },
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
