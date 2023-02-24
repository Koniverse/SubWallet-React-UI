import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { FullToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { getAlphaColor } from '../../theme/themes/default/colorAlgorithm';


export interface ComponentToken {}

interface SwAlertToken extends FullToken<'SwAlert'> {}

const genSwAlertStyle = (token: SwAlertToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        textAlign: 'start',
        backgroundColor: token.colorBgSecondary,
        borderRadius: token.borderRadiusLG,
        padding: `${token.paddingSM + 2}px ${token.paddingXS}px ${token.paddingSM + 2}px ${token.paddingSM}px`,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        gap: token.sizeXS + 2,

        [`${componentCls}-icon`]: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },

        [`${componentCls}-content`]: {
          display: 'flex',
          flexDirection: 'column',
          gap: token.sizeXXS,
          justifyContent: 'center',
        },

        [`${componentCls}-title`]: {
          fontSize: token.fontSizeHeading5,
          lineHeight: token.lineHeightHeading5,
        },

        [`${componentCls}-description`]: {
          fontSize: token.fontSizeHeading6,
          lineHeight: token.lineHeightHeading6,
          color: token.colorTextDescription,
        },

        [`${componentCls}-close-btn`]: {
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          margin: 'auto 0',
        },

        '&-info': {
          '--bg-color': getAlphaColor(token.colorPrimary, 0.1),
          '--icon-color': token.colorPrimary,
        },

        '&-warning': {
          '--bg-color': getAlphaColor(token.colorWarning, 0.1),
          '--icon-color': token.colorWarning,
        },

        '&-danger': {
          '--bg-color': getAlphaColor(token.colorError, 0.1),
          '--icon-color': token.colorError,
        },

        '&-success': {
          '--bg-color': getAlphaColor(token.colorSuccess, 0.1),
          '--icon-color': token.colorSuccess,
        },

        [`&.-with-bordered ${componentCls}-title`]: {
          fontSize: token.fontSizeHeading6,
          lineHeight: token.lineHeightHeading6,
        },

        [`&-info.-with-bordered`]: {
          border: `2px solid ${token.colorPrimary}`,
        },

        [`&-info.-with-bordered ${componentCls}-title`]: {
          color: token.colorPrimary,
        },

        [`&-warning.-with-bordered`]: {
          border: `2px solid ${token.colorWarning}`,
        },

        [`&-danger.-with-bordered`]: {
          border: `2px solid ${token.colorError}`,
        },

        [`&-success.-with-bordered`]: {
          border: `2px solid ${token.colorSuccess}`,
        },

        [`&-info ${componentCls}-title`]: {
          color: token.colorTextBase,
        },

        [`&-warning ${componentCls}-title`]: {
          color: token.colorWarning,
        },

        [`&-danger ${componentCls}-title`]: {
          color: token.colorError,
        },

        [`&-success ${componentCls}-title`]: {
          color: token.colorSuccess,
        },
      },
    },
  ];
};

export default genComponentStyleHook('SwAlert', (token) => {
  const swAvatarToken = mergeToken<SwAlertToken>(token);
  return [genSwAlertStyle(swAvatarToken)];
});
