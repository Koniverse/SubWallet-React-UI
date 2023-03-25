import { Keyframes } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genNotificationPlacementStyle from './placement';
import { resetComponent } from '../../style';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  zIndexPopup: number;
  width: number;
}

export interface NotificationToken extends FullToken<'Notification'> {
  notificationBg: string;
  notificationPaddingVertical: number;
  notificationPaddingHorizontal: number;
  notificationPadding: string;
  notificationMarginBottom: number;
  notificationMarginEdge: number;
  animationMaxHeight: number;
  notificationIconSize: number;
  notificationCloseButtonSize: number;
}

const genNotificationStyle: GenerateStyle<NotificationToken> = (token) => {
  const {
    iconCls,
    componentCls, // .ant-notification
    boxShadowSecondary,
    notificationMarginBottom,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationPadding,
    notificationMarginEdge,
    motionDurationMid,
    motionEaseInOut,
    fontSize,
    lineHeight,
    width,
  } = token;

  const noticeCls = `${componentCls}-notice`;

  const notificationFadeIn = new Keyframes('antNotificationFadeIn', {
    '0%': {
      left: {
        _skip_check_: true,
        value: width,
      },
      opacity: 0,
    },

    '100%': {
      left: {
        _skip_check_: true,
        value: 0,
      },
      opacity: 1,
    },
  });

  const notificationFadeOut = new Keyframes('antNotificationFadeOut', {
    '0%': {
      maxHeight: token.animationMaxHeight,
      marginBottom: notificationMarginBottom,
      opacity: 1,
    },

    '100%': {
      maxHeight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0,
    },
  });

  return [
    // ============================ Holder ============================
    {
      [componentCls]: {
        ...resetComponent(token),

        position: 'fixed',
        zIndex: token.zIndexPopup,
        marginInlineEnd: notificationMarginEdge,

        [`${componentCls}-hook-holder`]: {
          position: 'relative',
        },

        [`&${componentCls}-top, &${componentCls}-bottom`]: {
          [`${componentCls}-notice`]: {
            marginInline: 'auto auto',
          },
        },

        [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
          [`${componentCls}-notice`]: {
            marginInlineEnd: 'auto',
            marginInlineStart: 0,
          },
        },

        //  animation
        [`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
          animationDuration: token.motionDurationMid,
          animationTimingFunction: motionEaseInOut,
          animationFillMode: 'both',
          opacity: 0,
          animationPlayState: 'paused',
        },

        [`${componentCls}-fade-leave`]: {
          animationTimingFunction: motionEaseInOut,
          animationFillMode: 'both',

          animationDuration: motionDurationMid,
          animationPlayState: 'paused',
        },

        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]:
          {
            animationName: notificationFadeIn,
            animationPlayState: 'running',
          },

        [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
          animationName: notificationFadeOut,
          animationPlayState: 'running',
        },

        // placement
        ...genNotificationPlacementStyle(token),

        // RTL
        '&-rtl': {
          direction: 'rtl',

          [`${componentCls}-notice-btn`]: {
            float: 'left',
          },
        },
      },
    },

    // ============================ Notice ============================
    {
      [noticeCls]: {
        position: 'relative',
        width: 'max-content',
        maxWidth: `calc(100vw - ${notificationMarginEdge * 2}px)`,
        marginBottom: notificationMarginBottom,
        marginInlineStart: 'auto',
        padding: notificationPadding,
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        wordWrap: 'break-word',
        background: 'rgba(0, 0, 0, 0.75)',
        borderRadius: borderRadiusLG,
        boxShadow: boxShadowSecondary,

        [`${noticeCls}-with-icon`]: {
          display: 'flex',
          alignItems: 'center',
        },

        [`&${noticeCls}-content`]: {
          display: 'flex',
        },

        [`${noticeCls}-with-icon${noticeCls}-vertical`]: {
          flexDirection: 'column',
          minHeight: 94,
          minWidth: 78,
          alignItems: 'center',
          justifyContent: 'center',

          [`${noticeCls}-message`]: {
            marginInlineStart: 0,
          },

          [`${noticeCls}-icon`]: {
            position: 'static',
            marginRight: 0,
          },
        },

        [`&${noticeCls}-success`]: {
          padding: '6px 14px',
          border: `2px solid ${colorSuccess}`,
        },

        [`&${noticeCls}-warning`]: {
          padding: '6px 14px',
          border: `2px solid ${colorWarning}`,
        },

        [`&${noticeCls}-error`]: {
          padding: '6px 14px',
          border: `2px solid ${colorError}`,
        },

        [`${componentCls}-close-icon`]: {
          fontSize,
          cursor: 'pointer',
        },

        [`${noticeCls}-main-content`]: {
          paddingTop: token.paddingXXS,
          paddingBottom: token.paddingXS - 2,
        },

        [`${noticeCls}-message`]: {
          color: colorTextHeading,
          fontSize,
          lineHeight,
          fontWeight: token.bodyFontWeight,
        },

        [`${noticeCls}-description`]: {
          marginTop: token.marginXS,
          fontSize: token.fontSizeSM,
        },

        [`&${noticeCls}-closable ${noticeCls}-message`]: {
          paddingInlineEnd: 0,
        },

        [`${noticeCls}-with-icon ${noticeCls}-message`]: {
          fontSize,
        },

        [`${noticeCls}-with-icon ${noticeCls}-description`]: {
          marginTop: token.marginXS,
          fontSize: token.fontSizeSM,
        },

        // Icon & color style in different selector level
        // https://github.com/ant-design/ant-design/issues/16503
        // https://github.com/ant-design/ant-design/issues/15512
        [`${noticeCls}-icon`]: {
          marginRight: token.marginXS,
          // icon-font
          [`&-success${iconCls}`]: {
            color: colorSuccess,
          },
          [`&-info${iconCls}`]: {
            color: colorInfo,
          },
          [`&-warning${iconCls}`]: {
            color: colorWarning,
          },
          [`&-error${iconCls}`]: {
            color: colorError,
          },
        },

        [`${noticeCls}-close`]: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          marginTop: 'auto',
          marginBottom: 'auto',
          insetInlineEnd: token.notificationPaddingHorizontal,
          color: token.colorIcon,
          outline: 'none',
          width: token.notificationCloseButtonSize,
          height: token.notificationCloseButtonSize,
          borderRadius: token.borderRadiusSM,
          transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',

          '&:hover': {
            color: token.colorIconHover,
            backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent,
          },
        },

        [`${noticeCls}-btn`]: {
          float: 'left',
          marginTop: token.marginXXS,
          marginBottom: token.marginXXS,
        },
      },
    },

    // ============================= Pure =============================
    {
      [`${noticeCls}-pure-panel`]: {
        margin: 0,
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Notification',
  (token) => {
    const notificationPaddingVertical = token.paddingXS;
    const notificationPaddingHorizontal = token.padding;

    const notificationToken = mergeToken<NotificationToken>(token, {
      // default.less variables
      notificationBg: token.colorBgElevated,
      notificationPaddingVertical,
      notificationPaddingHorizontal,
      // index.less variables
      notificationPadding: `${token.paddingXS}px ${token.padding}px`,
      notificationMarginBottom: token.margin,
      notificationMarginEdge: token.marginLG,
      animationMaxHeight: 150,
      notificationIconSize: token.fontSizeLG * token.lineHeightLG,
      notificationCloseButtonSize: token.controlHeightLG * 0.55,
    });

    return [genNotificationStyle(notificationToken)];
  },
  (token) => ({
    zIndexPopup: token.zIndexPopupBase + 50,
    width: 384,
  }),
);
