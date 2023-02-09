import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface Web3BlockToken extends FullToken<'Web3Block'> {}

const genAccountCardStyle = (token: Web3BlockToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        display: 'flex',
        padding: `${token.padding}px ${token.paddingSM}px`,
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: token.colorBgInput,
        },

        [`${componentCls}-left-item`]: {
          display: 'flex',
          alignItems: 'center',
          paddingRight: token.paddingXS,
        },
        [`${componentCls}-middle-item`]: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        },
        [`${componentCls}-right-item`]: {
          display: 'flex',
          alignItems: 'center',
          marginRight: `-${token.marginXS}px`,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Web3Block', (token) => {
  const web3BlockToken = mergeToken<Web3BlockToken>(token);
  return [genAccountCardStyle(web3BlockToken)];
});
