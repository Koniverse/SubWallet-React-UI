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
        flexDirection: 'column',
        alignItems: 'center',

        [`& .pincode-input-container`]: {
          display: 'flex',
          width: 'fit-content',
          justifyContent: 'center',
        },

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

        [`& .ant-pin-code-error-wrapper`]: {
          textAlign: 'center',
          padding: `${token.paddingXS}px ${token.paddingSM}px`,
          marginTop: token.margin,
        },

        [`& .ant-pin-code-error-text`]: {
          color: token.colorErrorText,
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
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
