import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface PageIconToken extends FullToken<'PageIcon'> {}

const genBalanceItemStyle = (token: PageIconToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        padding: token.paddingLG,
        borderRadius: '50%',
        position: 'relative',
        width: 'min-content',
        overflow: 'hidden',

        '&::before': {
          content: "''",
          backgroundColor: 'var(--color)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: 0.1,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('PageIcon', (token) => {
  const pageIconToken = mergeToken<PageIconToken>(token);
  return [genBalanceItemStyle(pageIconToken)];
});
