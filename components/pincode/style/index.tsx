import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { squircleSvgInput, squircleSvgWrapper } from '../../style';

export interface ComponentToken {}

interface PinCodeToken extends FullToken<'PinCode'> {}

const genSquircleStyle = (token: PinCodeToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        display: 'flex',

        [`& .pincode-input-wrapper`]: {
          width: 48,
          height: 48,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: token.paddingXXS,
          marginRight: token.paddingXXS,
          background: '#1F1F1F',
          ...squircleSvgWrapper,

          '&:focus-within': {
            background: token.colorPrimary,
          },
        },

        [`& .pincode-input-text`]: {
          ...squircleSvgInput,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('PinCode', (token) => {
  const pinCodeToken = mergeToken<PinCodeToken>(token);
  return [genSquircleStyle(pinCodeToken)];
});
