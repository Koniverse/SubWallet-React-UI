import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';
import { getScrollbarWidth } from '../../style';

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
  const scrollbarWidth = getScrollbarWidth();

  return [
    {
      [`${componentCls}-section`]: {
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',

        [`${componentCls}-search-input`]: {
          padding: token.padding,
          paddingTop: 0,
        },

        [`${componentCls}-action-btn`]: {
          position: 'absolute',
          right: 4,
          top: 0,
          bottom: 0,
          margin: 'auto 0',
          zIndex: 10,
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

          '&.-ignore-scrollbar-padding': {
            paddingRight: token.padding - scrollbarWidth,
          },

          '&.-ignore-scrollbar-hide': {
            marginRight: -scrollbarWidth,
          },

          '&.-display-grid, &.-display-row': {
            paddingBottom: 0,
          },
        },

        [`&.-boxed-mode`]: {
          [`${componentCls}-wrapper`]: {
            position: 'relative',

            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              left: token.padding,
              right: token.padding,
              top: 0,
              bottom: 0,
              backgroundColor: token.colorBgSecondary,
              zIndex: -1,
              borderRadius: token.borderRadius,
            },
          },

          [`${componentCls}`]: {
            paddingTop: token.padding,
            paddingRight: token.padding * 2,
            paddingLeft: token.padding * 2,

            '&.-ignore-scrollbar-padding': {
              paddingRight: token.padding * 2 - scrollbarWidth,
            },
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
