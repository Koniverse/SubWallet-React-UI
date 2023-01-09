import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface SwScreenLayoutToken extends FullToken<'SwScreenLayout'> {
  // Custom token here
}
const genContainerStyle: GenerateStyle<SwScreenLayoutToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-container`]: {
        width: '100%',
        height: '100%',
        backgroundColor: token.colorBgBase,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',

        [`${componentCls}-body`]: {
          flex: 1,
          overflow: 'auto',
          padding: `0 ${token.padding}px`,
          margin: `${token.padding}px 0`,
        },

        [`${componentCls}-footer`]: {},

        [`${componentCls}-item`]: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: token.marginXXS / 2,
          padding: `${token.marginXXS / 2}px ${token.marginXXS}px`,
          cursor: 'pointer',

          [`${componentCls}-item-icon`]: {
            color: token.colorTextDescription,
          },

          [`${componentCls}-item-label`]: {
            fontSize: token.fontSizeSM,
            lineHeight: token.lineHeightSM,
            color: token.colorTextDescription,
          },

          [`&:hover, &${componentCls}-item-active`]: {
            [`${componentCls}-item-icon`]: {
              color: token.colorWhite,
            },

            [`${componentCls}-item-label`]: {
              color: token.colorWhite,
            },
          },
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('SwScreenLayout', (token) => {
  const SwScreenLayoutToken = mergeToken<SwScreenLayoutToken>(token);
  return [genContainerStyle(SwScreenLayoutToken)];
});
