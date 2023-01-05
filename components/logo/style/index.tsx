import type { CSSInterpolation } from '@ant-design/cssinjs';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { FullToken } from '../../theme/internal';

export interface ComponentToken {}

interface LogoToken extends FullToken<'Logo'> {}

const genLogoStyle = (token: LogoToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        position: 'relative',
        width: 'fit-content',

        [`& .-sub-logo`]: {
          position: 'absolute',
          bottom: '-2.5%',
          right: '-2.5%',
        },

        '& .ant-inner-logo': {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: token['gray-6'],
        },
      },
    },
  ];
};

export default genComponentStyleHook('Logo', (token) => {
  const logo = mergeToken<LogoToken>(token);
  return [genLogoStyle(logo)];
});
