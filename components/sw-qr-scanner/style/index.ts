import type { CSSInterpolation } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { initSlideMotion } from '../../style/motion';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface SwQrScannerToken extends FullToken<'SwQrScanner'> {
  modalContentBg: string;
  overlayBg: string;
  connerRadius: number;
}

const genScannerStyle = (token: SwQrScannerToken): CSSInterpolation => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-container`]: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',

        [`${componentCls}-select-camera-container`]: {
          position: 'absolute',
          top: token.marginLG,
          right: 0,
          left: 0,
          width: token.controlHeightLG * 6,
          zIndex: 1,
          margin: '0 auto',
        },

        [`${componentCls}-scanner`]: {
          width: '100%',
          height: '100%',
          backgroundColor: token.colorBgMask,
          position: 'absolute',
          top: 0,
          left: 0,
        },

        [`${componentCls}-footer`]: {
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: token.padding,
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          bottom: token.marginXL,

          [`${componentCls}-hidden-input`]: {
            display: 'none',
          },
        },

        [`${componentCls}-top-part`]: {
          backgroundColor: token.overlayBg,
          height: token.controlHeightLG * 3 + 6,

          [`${componentCls}-description`]: {
            textAlign: 'center',
            marginTop: token.margin,
            color: token.colorTextHeading,
            fontSize: token.fontSizeHeading6,
            lineHeight: token.lineHeightHeading6,
            fontWeight: token.headingFontWeight,
            padding: `0 ${token.padding}px`,
          },
        },

        [`${componentCls}-center-part`]: {
          height: token.controlHeightLG * 8,
          display: 'flex',
          flexDirection: 'row',

          [`${componentCls}-center-filter`]: {
            width: token.controlHeightLG * 8,
            borderRadius: token.connerRadius,
            position: 'relative',
            overflow: 'hidden',

            [`${componentCls}-center-overlay`]: {
              width: '100%',
              height: '100%',
              position: 'relative',
            },
          },

          [`${componentCls}-left-part`]: {
            backgroundColor: token.overlayBg,
            flex: 1,
            position: 'relative',
            zIndex: 1,

            [`${componentCls}-top-left-conner`]: {
              width: token.connerRadius * 2,
              height: token.connerRadius * 2,
              position: 'absolute',
              overflow: 'hidden',
              right: -token.connerRadius * 2,
              top: 0,

              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                height: token.connerRadius * 2,
                width: token.connerRadius * 2,
                borderTopLeftRadius: token.connerRadius,
                borderStyle: token.lineType,
                borderColor: token.colorPrimary,
                borderWidth: 0,
                borderLeftWidth: token.lineWidth * 2,
                borderTopWidth: token.lineWidth * 2,
                background: token.colorTransparent,
                boxShadow: `-${token.connerRadius}px 0 0 0 ${token.overlayBg}`,
              },
            },

            [`${componentCls}-bottom-left-conner`]: {
              width: token.connerRadius * 2,
              height: token.connerRadius * 2,
              position: 'absolute',
              overflow: 'hidden',
              right: -token.connerRadius * 2,
              bottom: 0,

              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                height: token.connerRadius * 2,
                width: token.connerRadius * 2,
                borderBottomLeftRadius: token.connerRadius,
                borderStyle: token.lineType,
                borderColor: token.colorPrimary,
                borderWidth: 0,
                borderLeftWidth: token.lineWidth * 2,
                borderBottomWidth: token.lineWidth * 2,
                background: token.colorTransparent,
                boxShadow: `-${token.connerRadius}px 0 0 0 ${token.overlayBg}`,
              },
            },
          },

          [`${componentCls}-right-part`]: {
            backgroundColor: token.overlayBg,
            flex: 1,
            position: 'relative',
            zIndex: 1,

            [`${componentCls}-top-right-conner`]: {
              width: token.connerRadius * 2,
              height: token.connerRadius * 2,
              position: 'absolute',
              overflow: 'hidden',
              left: -token.connerRadius * 2,
              top: 0,

              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                height: token.connerRadius * 2,
                width: token.connerRadius * 2,
                borderTopRightRadius: token.connerRadius,
                borderStyle: token.lineType,
                borderColor: token.colorPrimary,
                borderWidth: 0,
                borderRightWidth: token.lineWidth * 2,
                borderTopWidth: token.lineWidth * 2,
                background: token.colorTransparent,
                boxShadow: `${token.connerRadius}px 0 0 0 ${token.overlayBg}`,
              },
            },

            [`${componentCls}-bottom-right-conner`]: {
              width: token.connerRadius * 2,
              height: token.connerRadius * 2,
              position: 'absolute',
              overflow: 'hidden',
              left: -token.connerRadius * 2,
              bottom: 0,

              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                height: token.connerRadius * 2,
                width: token.connerRadius * 2,
                borderBottomRightRadius: token.connerRadius,
                borderStyle: token.lineType,
                borderColor: token.colorPrimary,
                borderWidth: 0,
                borderRightWidth: token.lineWidth * 2,
                borderBottomWidth: token.lineWidth * 2,
                background: token.colorTransparent,
                boxShadow: `${token.connerRadius}px 0 0 0 ${token.overlayBg}`,
              },
            },
          },

          [`&${componentCls}-scan-error`]: {
            [`${componentCls}-left-part`]: {
              [`${componentCls}-top-left-conner`]: {
                '&::before': {
                  borderColor: token.colorError,
                },
              },

              [`${componentCls}-bottom-left-conner`]: {
                '&::before': {
                  borderColor: token.colorError,
                },
              },
            },

            [`${componentCls}-right-part`]: {
              [`${componentCls}-top-right-conner`]: {
                '&::before': {
                  borderColor: token.colorError,
                },
              },

              [`${componentCls}-bottom-right-conner`]: {
                '&::before': {
                  borderColor: token.colorError,
                },
              },
            },
          },
        },

        [`${componentCls}-bottom-part`]: {
          backgroundColor: token.overlayBg,
          flex: 1,
        },
      },
    },
  ];
};

const genReaderStyle = (token: SwQrScannerToken): CSSInterpolation => {
  const { componentCls: _componentCls } = token;

  const componentCls = `${_componentCls}-reader`;

  return [
    {
      [`${componentCls}-wrapper`]: {
        [`${componentCls}-container`]: {
          width: '100%',
          paddingTop: '100%',
          overflow: 'hidden',
          position: 'relative',
        },

        [`${componentCls}-video`]: {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          overflow: 'hidden',
          position: 'absolute',
          transform: undefined,
        },
      },
    },
  ];
};

const genModalStyle: GenerateStyle<SwQrScannerToken> = (token) => {
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

        [`${componentCls}-d-none`]: {
          display: 'none',
        },

        [`@media (max-width: ${token.screenSMMax})`]: {
          [componentCls]: {
            maxWidth: 'calc(100vw - 16px)',
            margin: `${token.marginXS} auto`,
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

        [`${componentCls}-content`]: {
          position: 'relative',
          backgroundColor: token.modalContentBg,
          backgroundClip: 'padding-box',
          border: 0,
          boxShadow: token.boxShadowSecondary,
          pointerEvents: 'auto',
        },

        [`${componentCls}-body`]: {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          wordWrap: 'break-word',
          overflow: 'auto',
          height: '100vh',
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

const genItemContainerStyle: GenerateStyle<SwQrScannerToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [`${componentCls}-camera-items-container`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: token.paddingContentVerticalSM,

        [`${componentCls}-camera-item`]: {
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: token.paddingSM,
          padding: `${token.paddingSM + 2}px ${token.paddingSM}px`,
          borderRadius: token.borderRadius,
          backgroundColor: token.colorBgSecondary,

          '&:hover': {
            backgroundColor: token.colorBgInput,
          },

          [`${componentCls}-camera-icon`]: {
            padding: token.paddingXXS,
            background: token['gray-3'],
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },

          [`${componentCls}-camera-label`]: {
            color: token.colorWhite,
            overflow: 'hidden',
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: token.fontSizeHeading5,
            lineHeight: token.lineHeightHeading5,
            fontWeight: token.headingFontWeight,
          },

          [`${componentCls}-camera-selected`]: {
            color: token.colorSecondary,
          },
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('SwQrScanner', (token) => {
  const swQrScannerToken = mergeToken<SwQrScannerToken>(token, {
    modalContentBg: token.colorBgElevated,
    overlayBg: new TinyColor(token.colorBgDefault).setAlpha(0.95).toRgbString(),
    connerRadius: token.controlHeightLG / 2,
  });

  return [
    genScannerStyle(swQrScannerToken),
    genReaderStyle(swQrScannerToken),
    genModalStyle(swQrScannerToken),
    genItemContainerStyle(swQrScannerToken),
    initSlideMotion(swQrScannerToken, 'slide-down'),
  ];
});
