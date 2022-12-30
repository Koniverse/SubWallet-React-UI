import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

export interface ImageToken extends FullToken<'Image'> {}

export type PositionType = 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined;

const genImageStyle: GenerateStyle<ImageToken> = (token: ImageToken) => {
  const { componentCls } = token;
  return {
    // ============================== image ==============================
    [componentCls]: {
      position: 'relative',
      display: 'inline-block',
      '> img': {
        borderRadius: '8px',
      },
      '&.-shape-square': {
        '> img': {
          borderRadius: '0px',
        },
      },
      '&.-shape-rounded': {
        '> img': {
          borderRadius: '32px',
        },
      },
      '&.-shape-circle': {
        '> img': {
          borderRadius: '50%',
        },
      },
      '&.-responsive': {
        '> img': {
          maxWidth: '100%',
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Image', (token) => {
  const imageToken = mergeToken<ImageToken>(token);

  return [genImageStyle(imageToken)];
});
