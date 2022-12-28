import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import {genComponentStyleHook, mergeToken} from '../../theme/internal';

export interface ComponentToken {}

interface SquircleToken extends FullToken<'Squircle'> {
  spinDotDefault: string;
  spinDotSize: number;
  spinDotSizeSM: number;
  spinDotSizeLG: number;
}

const genSizeSquircleStyle = (token: SquircleToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  ];
}

// ============================== Export ==============================
export default genComponentStyleHook(
  'Squircle',
  (token) => {
    const squircleToken = mergeToken<SquircleToken>(token);
    return [genSizeSquircleStyle(squircleToken)];
  },
);
