import type { UploadToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genDraggerStyle: GenerateStyle<UploadToken> = (token) => {
  const { componentCls, iconCls } = token;

  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-drag`]: {
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        background: token.colorFillAlter,
        border: `${token.lineWidth}px dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        cursor: 'pointer',
        transition: `border-color ${token.motionDurationSlow}`,

        [componentCls]: {
          padding: `${token.padding}px 0`,
        },

        [`${componentCls}-btn`]: {
          display: 'table',
          width: '100%',
          height: '100%',
          outline: 'none',
        },

        [`${componentCls}-drag-container`]: {
          display: 'table-cell',
          verticalAlign: 'middle',
        },

        [`&:not(${componentCls}-disabled):hover`]: {
          borderColor: token.colorPrimaryHover,
        },

        [`p${componentCls}-drag-icon`]: {
          marginBottom: token.margin,

          [iconCls]: {
            color: token.colorPrimary,
            fontSize: token.uploadThumbnailSize,
          },
        },

        [`p${componentCls}-text`]: {
          margin: `0 0 ${token.marginXXS}px`,
          color: token.colorTextHeading,
          fontSize: token.fontSizeLG,
        },

        [`p${componentCls}-hint`]: {
          color: token.colorTextDescription,
          fontSize: token.fontSize,
        },

        // ===================== Disabled =====================
        [`&${componentCls}-disabled`]: {
          cursor: 'not-allowed',

          [`p${componentCls}-drag-icon ${iconCls},
            p${componentCls}-text,
            p${componentCls}-hint
          `]: {
            color: token.colorTextDisabled,
          },
        },
      },
    },
    [`${componentCls}-drag-single`]: {
      textAlign: 'center',
      cursor: 'pointer',
      background: token.colorBgSecondary,
      border: `2px dotted ${token.colorBgDivider}`,
      transition: `border-color ${token.motionDurationSlow}`,
      borderRadius: token.borderRadiusLG,
      padding: '32px 16px 10px 16px',

      [`${componentCls}-btn`]: {
        display: 'block',
        outline: 'none',
      },
      [`${componentCls}-drag__icon`]: {
        fontSize: 32,
        marginBottom: 8,
      },
      [`${componentCls}-drag__title`]: {
        fontWeight: '600',
        marginBottom: 8,
      },
      [`${componentCls}-drag__hint`]: {
        fontWeight: '500',
        color: token.colorTextLight4,
        wordBreak: 'break-word',
      },
      '&.-drag-hover': {
        paddingBottom: 32,
        borderColor: token['geekblue-6'],
      },
      '&.-uploaded': {
        paddingBottom: 32,

        [`${componentCls}-drag__icon`]: {
          color: token.colorWarning,
        },
      },

      '&:hover': {
        borderColor: token['geekblue-4'],
      },
    },
  };
};

export default genDraggerStyle;
