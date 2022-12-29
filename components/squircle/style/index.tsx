import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface SquircleToken extends FullToken<'Squircle'> {}

const genSizeStyle = (): CSSObject => {
  const styles = {} as CSSObject;
  const sizes = ['xs', 'sm', 'md', 'lg'];

  const sizeMap: Record<string, number> = {
    xs: 40,
    sm: 48,
    md: 52,
    lg: 64,
  };

  sizes.forEach((size) => {
    styles[`&.-size-${size}`] = {
      width: sizeMap[size],
      height: sizeMap[size],
    };
  });

  return styles;
};

const genSquircleStyle = (token: SquircleToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        [`&.-inline`]: {
          display: 'inline-flex',
        },

        ...genSizeStyle(),
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Squircle', (token) => {
  const squircleToken = mergeToken<SquircleToken>(token);
  return [genSquircleStyle(squircleToken)];
});
