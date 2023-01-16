import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook } from '../../../theme/internal';

const genStyle = (token: FullToken<'Web3Gallery'>): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        '.__footer-wrapper': {
          paddingLeft: 12,
          paddingRight: 12,
          height: 48,
          display: 'flex',
          overflow: 'hidden',
          alignItems: 'center',
        },
        '.__item-title': {
          color: token.colorTextLight1,
          fontWeight: token.headingFontWeight,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      },
    },
  ];
};

export default genComponentStyleHook('Web3Gallery', (token) => [genStyle(token)]);
