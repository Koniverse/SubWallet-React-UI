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
        backgroundColor: token.colorBgDefault,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',

        [`${componentCls}-header`]: {
          '&-with-divider': {
            borderBottom: `${token.lineWidth * 2}px ${token.lineType} ${token.colorSplit}`,
          },
        },

        [`${componentCls}-body`]: {
          flex: 1,
          overflow: 'auto',
          padding: 0,
          margin: 0,
        },

        [`${componentCls}-footer`]: {
          '&-button-container': {
            padding: `0 ${token.paddingSM - 2}px`,
            display: 'flex',
            margin: `${token.margin}px 0`,
          },
          '&-left-button': {
            flex: 1,
            margin: `0 ${token.paddingSM / 2}px`,
          },
          '&-right-button': {
            flex: 1,
            margin: `0 ${token.paddingSM / 2}px`,
          },
          '&-button-container-alone': {
            marginBottom: token.marginXL,
          },
          '&-content': {
            padding: `0 ${token.padding}px`,
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
