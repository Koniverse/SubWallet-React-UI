import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface SwTabBarToken extends FullToken<'SwTabBar'> {
  // Custom token here
  tabBarBorderRadius: number;
  tabBarFontWeight: number | string;
}
const genContainerStyle: GenerateStyle<SwTabBarToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-container`]: {
        width: '100%',
        backgroundColor: token.colorBgSecondary,
        borderRadius: `${token.tabBarBorderRadius}px ${token.tabBarBorderRadius}px 0 0`,
        paddingTop: token.paddingXS,
        paddingBottom: token.padding,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        [`${componentCls}-item`]: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `${token.marginXXS / 2}px ${token.marginXXS}px`,
          cursor: 'pointer',

          [`${componentCls}-item-icon`]: {
            color: token.colorTextDescription,
          },

          [`${componentCls}-item-label`]: {
            fontSize: token.fontSizeSM,
            lineHeight: token.lineHeightSM,
            fontWeight: token.tabBarFontWeight,
            color: token.colorTextDescription,
          },

          [`&:hover, &${componentCls}-item-active`]: {
            [`${componentCls}-item-icon`]: {
              color: token.colorWhite,
            },

            [`${componentCls}-item-label`]: {
              color: token.colorWhite,
            },
          },
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('SwTabBar', (token) => {
  const tabBarBorderRadius = token.borderRadiusXL + token.borderRadiusSM;
  const tabBarFontWeight = token.bodyFontWeight;
  const swTabBarToken = mergeToken<SwTabBarToken>(token, {
    tabBarBorderRadius,
    tabBarFontWeight,
  });
  return [genContainerStyle(swTabBarToken)];
});
