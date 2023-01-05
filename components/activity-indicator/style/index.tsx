import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface ActivityIndicatorToken extends FullToken<'ActivityIndicator'> {}

const genActivityIndicatorStyle: GenerateStyle<ActivityIndicatorToken> = (
  token: ActivityIndicatorToken,
): CSSObject => ({
  [`${token.componentCls}`]: {},
});

// ============================== Export ==============================
export default genComponentStyleHook('ActivityIndicator', (token) => {
  const activityIndicatorToken = mergeToken<ActivityIndicatorToken>(token);
  return [genActivityIndicatorStyle(activityIndicatorToken)];
});
