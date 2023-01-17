import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../../theme/internal';

export interface ComponentToken {}

interface DAppItemToken extends FullToken<'DAppItem'> {}

const genDAppItemStyle = (token: DAppItemToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        '&:hover': {
          [`${componentCls}-content-wrapper`]: {
            background: 'transparent',
          },
        },

        [`${componentCls}-name-wrapper`]: {
          display: 'flex',
          alignItems: 'center',
        },

        [`${componentCls}-divider`]: {
          paddingLeft: 60,
          '& .ant-divider-horizontal': {
            margin: 0,
          },
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

        [`${componentCls}-title`]: {
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          fontWeight: 500,
          color: token.colorTextLight4,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('DAppItem', (token) => {
  const accountItemToken = mergeToken<DAppItemToken>(token);
  return [genDAppItemStyle(accountItemToken)];
});
