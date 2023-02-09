import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface SwSubHeaderToken extends FullToken<'SwSubHeader'> {
  // Custom token here
}
const genContainerStyle: GenerateStyle<SwSubHeaderToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-container`]: {
        [`${componentCls}-title`]: {
          whiteSpace: 'nowrap',
          width: '100%',
          display: 'flex',
        },

        [`${componentCls}-center-part-pl`]: {
          paddingLeft: token.padding,
        },

        [`${componentCls}-title-content`]: {
          color: token.colorWhite,
          fontSize: token.fontSizeHeading4,
          lineHeight: token.lineHeightHeading4,
          textAlign: 'center',
        },

        [`&${componentCls}-center-part-pl`]: {
          paddingLeft: token.padding,
        },
      },

      [`${componentCls}-container-center`]: {
        [`${componentCls}-title`]: {
          justifyContent: 'center',
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('SwSubHeader', (token) => {
  const swSubHeaderToken = mergeToken<SwSubHeaderToken>(token);
  return [genContainerStyle(swSubHeaderToken)];
});
