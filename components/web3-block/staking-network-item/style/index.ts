import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface StakingNetworkToken extends FullToken<'StakingNetworkItem'> {}

const genStakingNetworkItemStyle = (token: StakingNetworkToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        backgroundColor: token.colorBgSecondary,
        borderRadius: token.borderRadiusLG,
        cursor: 'pointer',

        '&:hover': {
          [`${componentCls}-right-icon`]: {
            color: token.colorTextLight1,
          },
        },

        [`${componentCls}-name-wrapper`]: {
          display: 'flex',
          alignItems: 'center',
        },

        [`${componentCls}-name`]: {
          fontSize: token.fontSizeLG,
          lineHeight: token.lineHeightLG,
          fontWeight: 600,
          color: token.colorTextLight1,
          paddingRight: 8,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },

        [`${componentCls}-staking-count`]: {
          display: 'flex',
          alignItems: 'center',
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          color: token.colorTextLight4,
          fontWeight: 500,

          '.ant-number': {
            fontSize: token.fontSizeSM,
            paddingRight: 2,
          },
        },

        '.ant-web3-block-right-item': {
          marginRight: 0,
        },

        [`${componentCls}-right-icon`]: {
          color: token.colorTextLight4,
          paddingLeft: token.paddingXS,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('StakingNetworkItem', (token) => {
  const stakingNetworkToken = mergeToken<StakingNetworkToken>(token);
  return [genStakingNetworkItemStyle(stakingNetworkToken)];
});
