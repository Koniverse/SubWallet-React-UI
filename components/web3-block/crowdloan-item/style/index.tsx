import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface CrowdloanItemToken extends FullToken<'CrowdloanItem'> {}

const genCrowdloanItemStyle = (token: CrowdloanItemToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        backgroundColor: token.colorBgSecondary,
        borderRadius: token.borderRadiusLG,

        '&:hover': {
          backgroundColor: token.colorBgInput,
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

        [`${componentCls}-parachain`]: {
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          fontWeight: 500,
          color: token.colorTextLight4,
        },

        [`${componentCls}-right-part`]: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          paddingRight: token.paddingXS,
        },

        [`${componentCls}-left-content`]: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('CrowdloanItem', (token) => {
  const accountItemToken = mergeToken<CrowdloanItemToken>(token);
  return [genCrowdloanItemStyle(accountItemToken)];
});
