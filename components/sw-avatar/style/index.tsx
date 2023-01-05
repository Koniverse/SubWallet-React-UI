import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface SwAvatarToken extends FullToken<'SwAvatar'> {}

const genSwAvatarStyle = (token: SwAvatarToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: 'fit-content',
        border: `2px solid ${token.colorPrimary}`,

        '& .icon': {
          borderRadius: '50%',
          backgroundColor: token.colorBgSecondary,
          cursor: 'pointer',

          '> img': {
            borderRadius: '50%',
          },
        },

        '& .sub-icon': {
          position: 'absolute',
          bottom: '-2.5%',
          right: '-2.5%',
          borderRadius: '50%',
          padding: 2,
        },

        svg: {
          'circle:first-of-type': {
            display: 'none',
          },
        },
      },
    },
  ];
};

export default genComponentStyleHook('SwAvatar', (token) => {
  const swAvatarToken = mergeToken<SwAvatarToken>(token);
  return [genSwAvatarStyle(swAvatarToken)];
});
