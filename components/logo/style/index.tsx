import type { FullToken } from 'antd/es/theme/internal';
import { genComponentStyleHook, mergeToken } from 'antd/es/theme/internal';
import type { CSSInterpolation } from '@ant-design/cssinjs';

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
