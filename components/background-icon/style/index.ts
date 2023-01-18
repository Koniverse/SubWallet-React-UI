import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface BackgroundIconToken extends FullToken<'BackgroundIcon'> {}

const genBalanceItemStyle = (token: BackgroundIconToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '&.-shape-square': {
          borderRadius: '0px',
        },
        '&.-shape-circle': {
          borderRadius: '50%',
        },
        '&.-shape-rounded': {
          borderRadius: '25%',
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('BackgroundIcon', (token) => {
  const backgroundIconToken = mergeToken<BackgroundIconToken>(token);
  return [genBalanceItemStyle(backgroundIconToken)];
});
