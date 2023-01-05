import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface NumberToken extends FullToken<'Number'> {}

const genNumberStyle = (token: NumberToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        [`${componentCls}-prefix`]: {
          color: token.colorText,
        },

        [`${componentCls}-suffix`]: {
          color: token.colorText,
        },

        [`${componentCls}-integer`]: {
          color: token.colorText,
        },

        [`${componentCls}-decimal`]: {
          color: token.colorText,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Number', (token) => {
  const NumberToken = mergeToken<NumberToken>(token);
  return [genNumberStyle(NumberToken)];
});
