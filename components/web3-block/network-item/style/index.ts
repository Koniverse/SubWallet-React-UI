import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface NetworkItemToken extends FullToken<'NetworkItem'> {}

const genNetworkItemStyle = (token: NetworkItemToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        backgroundColor: token.colorBgSecondary,
        borderRadius: token.borderRadiusLG,

        [`${componentCls}-content`]: {
          borderRadius: token.borderRadiusLG,
        },

        '& .ant-web3-block-left-item': {
          paddingRight: 12,
        },

        '&.-with-divider': {
          backgroundColor: 'transparent',
          borderRadius: 0,

          '&:hover': {
            backgroundColor: 'transparent',

            [`${componentCls}-content`]: {
              backgroundColor: 'transparent',
            },
          },
        },
        '&:hover': {
          borderRadius: token.borderRadiusLG,
          backgroundColor: token.colorBgInput,

          [`${componentCls}-right-icon`]: {
            color: token.colorTextLight1,
          },
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
          color: token.colorTextLight4,
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
export default genComponentStyleHook('NetworkItem', (token) => {
  const accountItemToken = mergeToken<NetworkItemToken>(token);
  return [genNetworkItemStyle(accountItemToken)];
});
