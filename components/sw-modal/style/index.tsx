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

export interface SwModalToken extends FullToken<'SwModal'> {
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

const genModalStyle: GenerateStyle<SwModalToken> = (token) => {
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
          whiteSpace: 'nowrap',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
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
            color: token.modalIconHoverColor,
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
          padding: `0 ${token.paddingXXL}px ${token.padding}px`,
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
          padding: `0 ${token.padding}px ${token.padding}px`,
        },

        [`${componentCls}-footer`]: {
          textAlign: 'end',
          background: token.modalFooterBg,
          margin: `${token.marginSM}px -${token.margin}px 0`,
          padding: `${token.marginSM}px ${token.margin}px 0`,
          borderTop: `${token.lineWidth * 2}px ${token.modalHeaderBorderStyle} ${token.colorSplit}`,

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

const genModalConfirmStyle: GenerateStyle<SwModalToken> = (token) => {
  const { componentCls } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  return {
    [confirmComponentCls]: {
      '&-rtl': {
        direction: 'rtl',
      },
      [`${token.antCls}-modal-header`]: {
        // display: 'none',
      },
      [`${confirmComponentCls}-body-wrapper`]: {
        ...clearFix(),
      },
      [`${confirmComponentCls}-body`]: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

        [`${confirmComponentCls}-sub-title-container`]: {
          textAlign: 'center',

          [`${confirmComponentCls}-icon-container`]: {
            marginRight: token.marginXS,
          },
        },

        [`${confirmComponentCls}-sub-title`]: {
          flex: '0 0 100%',
          overflow: 'hidden',
          fontWeight: token.headingFontWeight,
          fontSize: token.fontSizeHeading5,
          lineHeight: token.lineHeightHeading5,

          [`+ ${confirmComponentCls}-content`]: {
            marginBlockStart: token.marginXS,
            flexBasis: '100%',
            maxWidth: `calc(100% - ${token.modalConfirmIconSize + token.marginSM}px)`,
          },
        },

        [`${confirmComponentCls}-content`]: {
          color: token.colorTextDescription,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          marginTop: token.marginMD,
          textAlign: 'center',
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
        display: 'flex',
        flexDirection: 'column',
        marginTop: token.marginMD,

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

    [`${confirmComponentCls}-warning`]: {
      [`${confirmComponentCls}-sub-title`]: {
        color: token.colorWarning,
      },
    },

    [`${confirmComponentCls}-warn`]: {
      [`${confirmComponentCls}-sub-title`]: {
        color: token.colorWarning,
      },
    },

    [`${confirmComponentCls}-error`]: {
      [`${confirmComponentCls}-sub-title`]: {
        color: token.colorError,
      },
    },

    // https://github.com/ant-design/ant-design/issues/37329
    [`${componentCls}-zoom-leave ${componentCls}-btns`]: {
      pointerEvents: 'none',
    },
  };
};

const genRTLStyle: GenerateStyle<SwModalToken> = (token) => {
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

const genWireframeStyle: GenerateStyle<SwModalToken> = (token) => {
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
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('SwModal', (token) => {
  const headerPaddingVertical = token.padding;
  const headerFontSize = token.fontSizeHeading4;
  const headerLineHeight = token.lineHeightHeading4;

  const modalToken = mergeToken<SwModalToken>(token, {
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
    genModalStyle(modalToken),
    genModalConfirmStyle(modalToken),
    genRTLStyle(modalToken),
    genModalMaskStyle(modalToken),
    token.wireframe && genWireframeStyle(modalToken),
    initSlideMotion(modalToken, 'slide-down'),
  ];
});
