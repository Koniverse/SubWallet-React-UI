import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface SpinToken extends FullToken<'Spin'> {}

const genSpinStyle: GenerateStyle<SpinToken> = (token: SpinToken): CSSObject => ({
  [`${token.componentCls}`]: {},
});

// ============================== Export ==============================
export default genComponentStyleHook('Spin', (token) => {
  const spinToken = mergeToken<SpinToken>(token);
  return [genSpinStyle(spinToken)];
});
