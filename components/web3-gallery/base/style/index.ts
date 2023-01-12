import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook } from '../../../theme/internal';
import { resetComponent } from '../../../style';

const genStyle = (token: FullToken<'Web3Gallery'>): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        cursor: 'pointer',
        backgroundColor: token['gray-1'],

        [`.__image-wrapper`]: {
          position: 'relative',
        },
        [`.__image-wrapper:before`]: {
          content: '""',
          display: 'block',
          paddingTop: '100%',
        },
        [`.__image`]: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          img: {
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          },
        },
        [`.__footer-wrapper`]: {
          transition: `backgroundColor ${token.motionDurationSlow}`,
        },

        [`&:hover .__footer-wrapper`]: {
          backgroundColor: token['gray-2'],
        },

        '&.-shape-default': {
          borderRadius: token.borderRadiusLG,
          overflow: 'hidden',
        },
      },
    },
  ];
};

export default genComponentStyleHook('Web3Gallery', (token) => [genStyle(token)]);
