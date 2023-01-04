import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

interface SwitchToken extends FullToken<'Switch'> {
  switchMinWidth: number;
  switchHeight: number;
  switchDuration: string;
  switchColor: string;
  switchDisabledOpacity: number;
  switchInnerMarginMin: number;
  switchInnerMarginMax: number;
  switchPadding: number;
  switchPinSize: number;
  switchBg: string;
  switchMinWidthSM: number;
  switchHeightSM: number;
  switchInnerMarginMinSM: number;
  switchInnerMarginMaxSM: number;
  switchPinSizeSM: number;
  switchHandleShadow: string;
  switchLoadingIconSize: number;
  switchLoadingIconColor: string;
  switchHandleActiveInset: string;
}

const genSwitchLoadingStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-loading-icon${token.iconCls}`]: {
        color: token.switchLoadingIconColor,
      },

      [`&${componentCls}-checked ${componentCls}-loading-icon`]: {
        color: token.switchColor,
      },
    },
  };
};

const genSwitchHandleStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const switchHandleCls = `${componentCls}-handle`;

  return {
    [componentCls]: {
      [switchHandleCls]: {
        position: 'absolute',
        top: 2,
        insetInlineStart: 2,
        width: 27,
        height: 27,
        transition: `all ${token.switchDuration} ease-in-out`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&::before': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          backgroundColor: token.colorWhite,
          borderRadius: 27,
          boxShadow: 'none',
          transition: `all ${token.switchDuration} ease-in-out`,
          content: '""',
        },
      },

      [`&${componentCls}-checked ${switchHandleCls}`]: {
        insetInlineStart: `calc(100% - 29px)`,
      },
    },
  };
};

const genSwitchInnerStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const switchInnerCls = `${componentCls}-inner`;

  return {
    [componentCls]: {
      [switchInnerCls]: {
        display: 'block',
        overflow: 'hidden',
        borderRadius: 100,
        height: '100%',

        [`${switchInnerCls}-checked, ${switchInnerCls}-unchecked`]: {
          display: 'block',
          color: token.colorTextLightSolid,
          fontSize: token.fontSizeSM,
          transition: `margin-inline-start ${token.switchDuration} ease-in-out, margin-inline-end ${token.switchDuration} ease-in-out`,
          pointerEvents: 'none',
        },

        [`${switchInnerCls}-checked`]: {
          marginInlineStart: `calc(${token.switchInnerMarginMin}px - 100% + ${
            token.switchPinSize + token.switchPadding * 2
          }px)`,
          marginInlineEnd: `calc(${token.switchInnerMarginMax}px + 100% - ${
            token.switchPinSize + token.switchPadding * 2
          }px)`,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginTop: -token.switchHeight,
          marginInlineStart: token.switchInnerMarginMax,
          marginInlineEnd: token.switchInnerMarginMin,
        },
      },

      [`&${componentCls}-checked ${switchInnerCls}`]: {
        [`${switchInnerCls}-checked`]: {
          marginInlineStart: token.switchInnerMarginMin,
          marginInlineEnd: token.switchInnerMarginMax,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginInlineStart: `calc(${token.switchInnerMarginMax}px + 100% - ${
            token.switchPinSize + token.switchPadding * 2
          }px)`,
          marginInlineEnd: `calc(${token.switchInnerMarginMin}px - 100% + ${
            token.switchPinSize + token.switchPadding * 2
          }px)`,
        },
      },
    },
  };
};

const genSwitchStyle = (token: SwitchToken): CSSObject => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      display: 'inline-block',
      minWidth: 51,
      height: 31,
      background: token['gray-5'],
      border: '0',
      borderRadius: 51,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid}`,
      userSelect: 'none',

      [`&${componentCls}-checked`]: {
        background: token['green-6'],
      },

      [`&${componentCls}-loading, &${componentCls}-disabled`]: {
        cursor: 'not-allowed',
        opacity: 0.4,

        '*': {
          boxShadow: 'none',
          cursor: 'not-allowed',
        },
      },

      // rtl style
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Switch', (token) => {
  const switchHeight = token.fontSize * token.lineHeight;
  const switchHeightSM = token.controlHeight / 2;
  const switchPadding = 2; // This is magic
  const switchPinSize = switchHeight - switchPadding * 2;
  const switchPinSizeSM = switchHeightSM - switchPadding * 2;

  const switchToken = mergeToken<SwitchToken>(token, {
    switchMinWidth: switchPinSize * 2 + switchPadding * 4,
    switchHeight,
    switchDuration: token.motionDurationMid,
    switchColor: token.colorPrimary,
    switchDisabledOpacity: token.opacityLoading,
    switchInnerMarginMin: switchPinSize / 2,
    switchInnerMarginMax: switchPinSize + switchPadding + switchPadding * 2,
    switchPadding,
    switchPinSize,
    switchBg: token.colorBgContainer,
    switchMinWidthSM: switchPinSizeSM * 2 + switchPadding * 2,
    switchHeightSM,
    switchInnerMarginMinSM: switchPinSizeSM / 2,
    switchInnerMarginMaxSM: switchPinSizeSM + switchPadding + switchPadding * 2,
    switchPinSizeSM,
    switchHandleShadow: `0 2px 4px 0 ${new TinyColor('#00230b').setAlpha(0.2).toRgbString()}`,
    switchLoadingIconSize: token.fontSizeIcon * 0.75,
    switchLoadingIconColor: `rgba(0, 0, 0, ${token.opacityLoading})`,
    switchHandleActiveInset: '-30%',
  });

  return [
    genSwitchStyle(switchToken),

    // inner style
    genSwitchInnerStyle(switchToken),

    // handle style
    genSwitchHandleStyle(switchToken),

    // loading style
    genSwitchLoadingStyle(switchToken),
  ];
});
