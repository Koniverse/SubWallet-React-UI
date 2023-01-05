import type React from 'react';
import { initFadeMotion, initSlideMotion } from '../../style/motion';
import type { AliasToken, FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';
import { clearFix, genFocusStyle, resetComponent } from '../../style';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface SelectModalToken extends FullToken<'SelectModal'> {
  // Custom token here
  modalBodyPadding: number;
  modalHeaderBg: string;
  modalHeaderPadding: string;
  modalHeaderBorderWidth: number;
  modalHeaderBorderStyle: string;
  modalHeaderTitleLineHeight: number;
  modalHeaderTitleFontSize: number;
  modalHeaderBorderColorSplit: string;
  modalHeaderCloseSize: number;
  modalContentBg: string;
  modalHeadingColor: string;
  modalCloseColor: string;
  modalCloseBtnSize: number;
  modalFooterBg: string;
  modalFooterBorderColorSplit: string;
  modalFooterBorderStyle: string;
  modalFooterPaddingVertical: number;
  modalFooterPaddingHorizontal: number;
  modalFooterBorderWidth: number;
  modalConfirmTitleFontSize: number;
  modalIconHoverColor: string;
  modalConfirmIconSize: number;
}

function box(position: React.CSSProperties['position']): React.CSSProperties {
  return {
    position,
    top: 0,
    insetInlineEnd: 0,
    bottom: 0,
    insetInlineStart: 0,
  };
}

export const genModalMaskStyle: GenerateStyle<TokenWithCommonCls<AliasToken>> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-root`]: {
        [`${componentCls}${token.antCls}-zoom-enter, ${componentCls}${token.antCls}-zoom-appear`]: {
          // reset scale avoid mousePosition bug
          transform: 'none',
          opacity: 0,
          animationDuration: token.motionDurationSlow,
          // https://github.com/ant-design/ant-design/issues/11777
          userSelect: 'none',
        },

        [`${componentCls}-mask`]: {
          ...box('fixed'),
          zIndex: token.zIndexPopupBase,
          height: '100%',
          backgroundColor: token.colorBgMask,

          [`${componentCls}-hidden`]: {
            display: 'none',
          },
        },

        [`${componentCls}-wrap`]: {
          ...box('fixed'),
          overflow: 'auto',
          outline: 0,
          WebkitOverflowScrolling: 'touch',
        },
      },
    },
    { [`${componentCls}-root`]: initFadeMotion(token) },
  ];
};

const genInputStyle: GenerateStyle<SelectModalToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-input`]: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        color: token.colorTextTertiary,
        lineHeight: token.lineHeightLG,
        borderWidth: token.lineWidth * 2,
        borderStyle: token.modalHeaderBorderStyle,

        '&:hover': {
          borderColor: `${token['geekblue-4']} !important`,
        },

        [`&${componentCls}-input-focus`]: {
          borderColor: `${token['geekblue-6']} !important`,
        },

        [`${componentCls}-input-placeholder`]: {
          color: token.colorTextPlaceholder,
          fontSize: token.fontSizeLG,
        },

        // Size
        [`&${componentCls}-input-size-default`]: {
          padding: `${token.paddingContentVertical - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        [`&${componentCls}-input-size-small`]: {
          padding: `${token.paddingContentVerticalSM - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        [`&${componentCls}-input-size-medium`]: {
          padding: `${token.paddingContentVertical - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        [`&${componentCls}-input-size-large`]: {
          padding: `${token.paddingContentVerticalLG - token.lineWidth * 2}px ${
            token.paddingContentHorizontal - token.lineWidth * 2
          }px`,
        },

        // Border
        [`&${componentCls}-input-border-square`]: {
          borderRadius: 0,
        },

        [`&${componentCls}-input-border-round`]: {
          [`&${componentCls}-input-size-default`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVertical * 2,
          },

          [`&${componentCls}-input-size-small`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVerticalSM * 2,
          },

          [`&${componentCls}-input-size-medium`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVertical * 2,
          },

          [`&${componentCls}-input-size-large`]: {
            borderRadius: token.lineHeightLG + token.paddingContentVerticalLG * 2,
          },
        },

        [`&${componentCls}-input-border-default`]: {
          borderRadius: token.borderRadius,
        },

        // Background
        [`&${componentCls}-input-bg-default`]: {
          background: token.colorBgSecondary,
          borderColor: token.colorBgSecondary,
        },

        [`&${componentCls}-input-bg-transparent`]: {
          background: 'transparent',
          borderColor: 'transparent',
        },
      },
    },
  ];
};

const genModalStyle: GenerateStyle<SelectModalToken> = (token) => {
  const { componentCls } = token;

  return [
    // ======================== Root =========================
    {
      [`${componentCls}-root`]: {
        [`${componentCls}-wrap`]: {
          zIndex: token.zIndexPopupBase,
          position: 'fixed',
          inset: 0,
          overflow: 'auto',
          outline: 0,
          WebkitOverflowScrolling: 'touch',
        },
        [`${componentCls}-wrap-rtl`]: {
          direction: 'rtl',
        },
        [`${componentCls}-d-none`]: {
          display: 'none',
        },

        [`@media (max-width: ${token.screenSMMax})`]: {
          [componentCls]: {
            maxWidth: 'calc(100vw - 16px)',
            margin: `${token.marginXS} auto`,
          },
          [`${componentCls}-centered`]: {
            [componentCls]: {
              flex: 1,
            },
          },
        },
      },
    },

    // ======================== Modal ========================
    {
      [componentCls]: {
        ...resetComponent(token),
        pointerEvents: 'none',
        margin: '0 auto',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        [`${componentCls}-title`]: {
          margin: 0,
          color: token.modalHeadingColor,
          fontWeight: token.fontWeightStrong,
          fontSize: token.modalHeaderTitleFontSize,
          lineHeight: token.modalHeaderTitleLineHeight,
          wordWrap: 'break-word',
          textAlign: 'center',
        },

        [`${componentCls}-content`]: {
          position: 'relative',
          backgroundColor: token.modalContentBg,
          backgroundClip: 'padding-box',
          border: 0,
          borderRadius: `${token.borderRadiusXXL}px ${token.borderRadiusXXL}px 0 0`,
          boxShadow: token.boxShadowSecondary,
          pointerEvents: 'auto',
          padding: token.padding,
        },

        [`${componentCls}-close`]: {
          position: 'absolute',
          top: token.modalHeaderCloseSize / 4,
          insetInlineStart: (token.modalHeaderCloseSize - token.modalCloseBtnSize) / 2,
          zIndex: token.zIndexPopupBase + 10,
          padding: 0,
          color: token.modalCloseColor,
          fontWeight: token.fontWeightStrong,
          lineHeight: 1,
          textDecoration: 'none',
          background: 'transparent',
          borderRadius: token.borderRadiusSM,
          width: token.modalHeaderCloseSize,
          height: token.modalHeaderCloseSize,
          border: 0,
          outline: 0,
          cursor: 'pointer',
          transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,

          '&-x': {
            display: 'block',
            textAlign: 'center',
          },

          '&:hover': {
            backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent,
            textDecoration: 'none',
          },

          '&:active': {
            backgroundColor: token.wireframe ? 'transparent' : token.colorFillContentHover,
          },

          ...genFocusStyle(token),
        },

        [`${componentCls}-header`]: {
          color: token.colorText,
          background: token.modalHeaderBg,
          borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
          padding: `0 ${token.padding}px ${token.padding}px`,
          margin: `0 -${token.padding}px ${token.padding}px`,
          borderBottom: `${token.lineWidth * 2}px ${token.modalHeaderBorderStyle} ${
            token.colorSplit
          }`,
        },

        [`${componentCls}-body`]: {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          wordWrap: 'break-word',
          overflow: 'auto',
          maxHeight: '80vh',
          margin: `0 -${token.padding}px`,
          padding: `0 ${token.padding}px`,

          [`${componentCls}-item-container`]: {
            display: 'flex',
            flexDirection: 'column',
            gap: token.paddingContentVerticalSM,

            [`${componentCls}-item`]: {
              cursor: 'pointer',
            },
          },
        },

        [`${componentCls}-footer`]: {
          textAlign: 'end',
          background: token.modalFooterBg,
          marginTop: token.marginSM,

          [`${token.antCls}-btn + ${token.antCls}-btn:not(${token.antCls}-dropdown-trigger)`]: {
            marginBottom: 0,
            marginInlineStart: token.marginXS,
          },
        },

        [`${componentCls}-open`]: {
          overflow: 'hidden',
        },
      },
    },

    // ======================== Pure =========================
    {
      [`${componentCls}-pure-panel`]: {
        top: 'auto',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',

        [`${componentCls}-content,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
        },

        [`${componentCls}-confirm-body`]: {
          marginBottom: 'auto',
        },
      },
    },
  ];
};

const genModalConfirmStyle: GenerateStyle<SelectModalToken> = (token) => {
  const { componentCls } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  return {
    [confirmComponentCls]: {
      '&-rtl': {
        direction: 'rtl',
      },
      [`${token.antCls}-modal-header`]: {
        display: 'none',
      },
      [`${confirmComponentCls}-body-wrapper`]: {
        ...clearFix(),
      },
      [`${confirmComponentCls}-body`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',

        [`${confirmComponentCls}-title`]: {
          flex: '0 0 100%',
          display: 'block',
          // create BFC to avoid
          // https://user-images.githubusercontent.com/507615/37702510-ba844e06-2d2d-11e8-9b67-8e19be57f445.png
          overflow: 'hidden',
          color: token.colorWhite,
          fontWeight: token.fontWeightStrong,
          fontSize: token.modalHeaderTitleFontSize,
          lineHeight: token.modalHeaderTitleLineHeight,

          [`+ ${confirmComponentCls}-content`]: {
            marginBlockStart: token.marginXS,
            flexBasis: '100%',
            maxWidth: `calc(100% - ${token.modalConfirmIconSize + token.marginSM}px)`,
          },
        },

        [`${confirmComponentCls}-content`]: {
          color: token.colorText,
          fontSize: token.fontSize,
        },

        [`> ${token.iconCls}`]: {
          flex: 'none',
          marginInlineEnd: token.marginSM,
          fontSize: token.modalConfirmIconSize,

          [`+ ${confirmComponentCls}-title`]: {
            flex: 1,
          },

          // `content` after `icon` should set marginLeft
          [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
            marginInlineStart: token.modalConfirmIconSize + token.marginSM,
          },
        },
      },
      [`${confirmComponentCls}-btns`]: {
        textAlign: 'end',
        marginTop: token.marginSM,

        [`${token.antCls}-btn + ${token.antCls}-btn`]: {
          marginBottom: 0,
          marginInlineStart: token.marginXS,
        },
      },
    },

    [`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorError,
    },

    [`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorWarning,
    },

    [`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorInfo,
    },

    [`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorSuccess,
    },

    // https://github.com/ant-design/ant-design/issues/37329
    [`${componentCls}-zoom-leave ${componentCls}-btns`]: {
      pointerEvents: 'none',
    },
  };
};

const genRTLStyle: GenerateStyle<SelectModalToken> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap-rtl`]: {
        direction: 'rtl',

        [`${componentCls}-confirm-body`]: {
          direction: 'rtl',
        },
      },
    },
  };
};

const genWireframeStyle: GenerateStyle<SelectModalToken> = (token) => {
  const { componentCls, antCls } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  return {
    [componentCls]: {
      [`${componentCls}-content`]: {
        padding: 0,
      },

      [`${componentCls}-header`]: {
        padding: token.modalHeaderPadding,
        borderBottom: `${token.modalHeaderBorderWidth}px ${token.modalHeaderBorderStyle} ${token.modalHeaderBorderColorSplit}`,
        marginBottom: 0,
      },

      [`${componentCls}-body`]: {
        padding: token.modalBodyPadding,
      },

      [`${componentCls}-footer`]: {
        padding: `${token.modalFooterPaddingVertical}px ${token.modalFooterPaddingHorizontal}px`,
        borderTop: `${token.modalFooterBorderWidth}px ${token.modalFooterBorderStyle} ${token.modalFooterBorderColorSplit}`,
        borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
        marginTop: 0,
      },
    },

    [confirmComponentCls]: {
      [`${antCls}-modal-body`]: {
        padding: `${token.padding * 2}px ${token.padding * 2}px ${token.paddingLG}px`,
      },
      [`${confirmComponentCls}-body`]: {
        [`> ${token.iconCls}`]: {
          marginInlineEnd: token.margin,

          // `content` after `icon` should set marginLeft
          [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
            marginInlineStart: token.modalConfirmIconSize + token.margin,
          },
        },
      },
      [`${confirmComponentCls}-btns`]: {
        marginTop: token.marginLG,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('SelectModal', (token) => {
  const headerPaddingVertical = token.padding;
  const headerFontSize = token.fontSizeHeading4;
  const headerLineHeight = token.lineHeightHeading4;

  const modalToken = mergeToken<SelectModalToken>(token, {
    modalBodyPadding: token.paddingLG,
    modalHeaderBg: token.colorBgElevated,
    modalHeaderPadding: `${headerPaddingVertical}px ${token.paddingLG}px`,
    modalHeaderBorderWidth: token.lineWidth,
    modalHeaderBorderStyle: token.lineType,
    modalHeaderTitleLineHeight: headerLineHeight,
    modalHeaderTitleFontSize: headerFontSize,
    modalHeaderBorderColorSplit: token.colorSplit,
    modalHeaderCloseSize: token.controlHeightLG,
    modalContentBg: token.colorBgElevated,
    modalHeadingColor: token.colorTextHeading,
    modalCloseColor: token.colorText,
    modalFooterBg: 'transparent',
    modalFooterBorderColorSplit: token.colorSplit,
    modalFooterBorderStyle: token.lineType,
    modalFooterPaddingVertical: token.paddingXS,
    modalFooterPaddingHorizontal: token.padding,
    modalFooterBorderWidth: token.lineWidth,
    modalConfirmTitleFontSize: token.fontSizeLG,
    modalIconHoverColor: token.colorIconHover,
    modalConfirmIconSize: token.fontSize * token.lineHeight,
    modalCloseBtnSize: token.controlHeightLG * 0.6,
  });
  return [
    genInputStyle(modalToken),
    genModalStyle(modalToken),
    genModalConfirmStyle(modalToken),
    genRTLStyle(modalToken),
    genModalMaskStyle(modalToken),
    token.wireframe && genWireframeStyle(modalToken),
    initSlideMotion(modalToken, 'slide-down'),
  ];
});
