import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface StakingValidatorToken extends FullToken<'StakingValidatorItem'> {}

const genStakingNetworkItemStyle = (token: StakingValidatorToken): CSSInterpolation => {
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

        '.ant-web3-block-left-item': {
          alignItems: 'flex-start',
          paddingRight: 12,
        },

        '.ant-web3-block-right-item': {
          alignItems: 'flex-start',
          marginRight: 0,
        },

        [`${componentCls}-right-icon`]: {
          color: token.colorTextLight4,
          paddingLeft: token.paddingXS,
        },

        [`${componentCls}-right-part`]: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('StakingValidatorItem', (token) => {
  const stakingValidatorToken = mergeToken<StakingValidatorToken>(token);
  return [genStakingNetworkItemStyle(stakingValidatorToken)];
});
