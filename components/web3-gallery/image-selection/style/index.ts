import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook } from '../../../theme/internal';

const genStyle = (token: FullToken<'Web3Gallery'>): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        position: 'relative',

        '.__overlay': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          paddingLeft: 4,
          paddingRight: 4,
          alignItems: 'flex-end',

          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: token.borderRadiusLG,
            border: `2px solid ${token.colorSuccess}`,
            transition: `opacity ${token.motionDurationSlow}`,
            opacity: 0,
          },
        },

        '.__check-icon': {
          position: 'absolute',
          color: token.colorSuccess,
          fontSize: 20,
          top: 6,
          right: 6,
          transition: `opacity ${token.motionDurationSlow}`,
          opacity: 0,
        },

        '.__item-title': {
          paddingLeft: 8,
          paddingRight: 8,
          position: 'relative',
          backgroundColor: token.colorTextDark4,
          color: token.colorTextLight1,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          height: 24,
          lineHeight: '24px',
          fontSize: token.fontSizeSM,
          borderRadius: token.borderRadiusSM,
          marginBottom: 4,
          flex: 1,
        },

        '&.-is-selected': {
          '.__overlay:before, .__check-icon': {
            opacity: 1,
          },
        },
      },
    },
  ];
};

export default genComponentStyleHook('Web3Gallery', (token) => [genStyle(token)]);
