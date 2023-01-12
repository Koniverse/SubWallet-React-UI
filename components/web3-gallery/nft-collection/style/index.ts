import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook } from '../../../theme/internal';

const genStyle = (token: FullToken<'Web3Gallery'>): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        '.__footer-wrapper': {
          paddingLeft: 4,
          paddingRight: 4,
          height: 48,
          display: 'flex',
          overflow: 'hidden',
        },
        '.__footer-left, .__footer-right': {
          display: 'flex',
          paddingLeft: 8,
          paddingRight: 8,
          alignItems: 'center',
          overflow: 'hidden',
        },

        '.__footer-left': {
          flex: 1,
        },

        '.__collection-title, .__collection-count': {
          fontWeight: token.headingFontWeight,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },

        '.__collection-title': {
          color: token.colorTextLight1,
        },

        '.__collection-count': {
          color: token.colorTextLight4,
        },
      },
    },
  ];
};

export default genComponentStyleHook('Web3Gallery', (token) => [genStyle(token)]);
