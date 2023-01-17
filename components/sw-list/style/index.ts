import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';

const genListStyle = (token: FullToken<'SwList'>): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        '> .__item-wrapper.__item-wrapper': {
          flex: 0,
        },
        '.___scroll-renderer-anchor.___scroll-renderer-anchor': {
          margin: 0,
        },
        '&.-render-default': {
          '> .__item-wrapper:last-of-type': {
            '.ant-divider, .__divider': {
              display: 'none',
            },
          },
        },
        '&.-render-on-scroll': {
          '> .__item-wrapper:nth-last-child(2)': {
            '.ant-divider, .__divider': {
              display: 'none',
            },
          },
        },
        '.__infinite-loader': {
          color: token.colorText,
          fontSize: 24,
        },
      },
    },
  ];
};

const genSectionStyle = (token: FullToken<'SwList'>): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-section`]: {
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',

        [`${componentCls}-search-input`]: {
          marginBottom: token.margin,
          paddingLeft: token.padding,
          paddingRight: token.padding,
        },

        [`${componentCls}-wrapper`]: {
          flexGrow: 1,
          overflow: 'hidden',
        },

        [`${componentCls}`]: {
          overflow: 'auto',
          maxHeight: '100%',
          paddingLeft: token.padding,
          paddingRight: token.padding,
          paddingBottom: token.padding,

          '&.-display-grid, &.-display-row': {
            paddingBottom: 0,
          },
        },
      },
    },
  ];
};

export default genComponentStyleHook('SwList', (token) => [
  genListStyle(token),
  genSectionStyle(token),
]);
