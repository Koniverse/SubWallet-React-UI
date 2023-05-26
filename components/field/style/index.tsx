import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface FieldToken extends FullToken<'Field'> {}
const genFieldStyle: GenerateStyle<FieldToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-container`]: {
        display: 'flex',
        flexDirection: 'column',
        color: token.colorTextTertiary,
        lineHeight: token.lineHeightLG,
        position: 'relative',

        [`${componentCls}-wrapper`]: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: token.sizeXS,
          overflow: 'hidden',
          zIndex: 2,

          [`${componentCls}-content-wrapper`]: {
            overflow: 'hidden',
            flex: 1,

            [`${componentCls}-content`]: {
              marginBottom: 0,
              color: token.colorText,
            },
          },
        },

        [`&${componentCls}-placeholder`]: {
          [`${componentCls}-wrapper`]: {
            [`${componentCls}-content-wrapper`]: {
              [`${componentCls}-content`]: {
                color: token.colorTextLight4,
              },
            },
          },
        },

        [`${componentCls}-label`]: {
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          color: token.colorTextLight4,
          paddingLeft: token.paddingSM,
          paddingRight: token.paddingSM,
          paddingTop: token.paddingXXS,
          top: token.paddingXXS,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          position: 'relative',
        },

        [`${componentCls}-suffix, ${componentCls}-prefix`]: {
          color: token.colorTextLight4,
          display: 'flex',
          alignItems: 'center',
        },

        [`${componentCls}-status-icon`]: {
          fontSize: 20,
          marginLeft: 8,
          marginRight: 8,
          order: -1,
        },

        // Size

        [`&${componentCls}-size-small`]: {
          [`${componentCls}-wrapper`]: {
            padding: `${token.paddingContentVerticalSM}px ${token.paddingContentHorizontal}px`,
          },
        },

        [`&${componentCls}-size-medium`]: {
          [`${componentCls}-wrapper`]: {
            padding: `${token.paddingSM - 2}px ${token.paddingContentHorizontal}px`,
            minHeight: 48,
          },
        },

        [`&${componentCls}-with-label`]: {
          [`${componentCls}-placeholder`]: {
            color: token.colorText,
          },

          [`${componentCls}-wrapper`]: {
            padding: `${token.paddingXS}px ${token.paddingSM}px ${token.paddingSM - 2}px`,
            minHeight: 48,
          },
        },

        // Border
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'block',
          border: '2px solid transparent',
          transition: `border-color ${token.motionDurationSlow}`,
          zIndex: 0,
        },

        [`&${componentCls}-border-square`]: {
          borderRadius: 0,
          '&:before': {
            borderRadius: 0,
          },
        },

        [`&${componentCls}-border-round`]: {
          borderRadius: token.controlHeightLG + token.borderRadiusLG,
          '&:before': {
            borderRadius: token.controlHeightLG + token.borderRadiusLG,
          },
        },

        [`&${componentCls}-border-default`]: {
          borderRadius: token.borderRadiusLG,
          '&:before': {
            borderRadius: token.borderRadiusLG,
          },
        },

        // Background
        [`&${componentCls}-bg-default`]: {
          background: token.colorBgSecondary,
        },

        [`&${componentCls}-bg-transparent`]: {
          background: 'transparent',
        },

        // Color
        '&.-status-warning, &.-disabled&.-status-warning': {
          '&:before': {
            borderColor: token.colorWarning,
          },

          [`${componentCls}-status-icon`]: {
            color: token.colorWarning,
          },
        },

        '&.-status-error, &.-disabled&.-status-error': {
          '&:before': {
            borderColor: token.colorError,
          },

          [`${componentCls}-status-icon`]: {
            color: token.colorError,
          },
        },

        '&.-status-success.-display-success-status': {
          '&:before': {
            borderColor: token.colorSuccess,
          },

          [`${componentCls}-status-icon`]: {
            color: token.colorSuccess,
          },
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Field', (token) => {
  const fieldToken = mergeToken<FieldToken>(token);
  return [genFieldStyle(fieldToken)];
});
