import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface BalanceItemToken extends FullToken<'BalanceItem'> {}

const genBalanceItemStyle = (token: BalanceItemToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        backgroundColor: token.colorBgSecondary,
        borderRadius: token.borderRadiusLG,
        '&.-with-divider': {
          backgroundColor: 'transparent',
          borderRadius: 0,

          [`${componentCls}-content`]: {
            borderRadius: 0,
            backgroundColor: 'transparent',
          },

          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        '&:hover': {
          backgroundColor: token.colorBgInput,

          [`${componentCls}-right-icon`]: {
            color: token.colorTextLight1,
          },
        },

        [`${componentCls}-content`]: {
          borderRadius: token.borderRadiusLG,
        },

        [`${componentCls}-name`]: {
          fontSize: token.fontSizeLG,
          lineHeight: token.lineHeightLG,
          fontWeight: 600,
          color: token.colorTextLight1,
        },

        [`${componentCls}-divider`]: {
          '& .ant-divider-horizontal': {
            margin: 0,
          },
        },

        [`${componentCls}-right-part`]: {
          display: 'flex',
          alignItems: 'center',
        },

        [`${componentCls}-right-icon`]: {
          color: token.colorTextLight6,
          paddingLeft: token.paddingXS,
          paddingRight: token.paddingXS,
        },

        [`${componentCls}-balance-info-wrapper`]: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        },

        [`${componentCls}-icon`]: {
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('BalanceItem', (token) => {
  const accountItemToken = mergeToken<BalanceItemToken>(token);
  return [genBalanceItemStyle(accountItemToken)];
});
