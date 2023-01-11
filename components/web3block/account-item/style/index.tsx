import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface AccountItemToken extends FullToken<'AccountItem'> {}

const genAccountItemStyle = (token: AccountItemToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        '&:hover': {
          backgroundColor: token.colorBgInput,
        },

        [`${componentCls}-address`]: {
          fontSize: token.fontSizeLG,
          lineHeight: token.lineHeightLG,
          fontWeight: 600,
          color: token.colorTextLight1,
        },

        [`${componentCls}-right-part`]: {
          display: 'flex',
          alignItems: 'center',
        },

        [`${componentCls}-icon`]: {
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },

        [`&.-selected`]: {
          backgroundColor: token.colorBgInput,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('AccountItem', (token) => {
  const accountItemToken = mergeToken<AccountItemToken>(token);
  return [genAccountItemStyle(accountItemToken)];
});
