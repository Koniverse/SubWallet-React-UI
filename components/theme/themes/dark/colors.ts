import { generate } from '@ant-design/colors';
import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';
import { colorDarkBase, colorLightBase } from '../seed';

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor, { theme: 'dark', backgroundColor: colorDarkBase });
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[6],
    6: colors[5],
    7: colors[4],
    8: colors[6],
    9: colors[5],
    10: colors[4],
    // 8: colors[9],
    // 9: colors[8],
    // 10: colors[7],
  };
};

export const generateNeutralColorPalettes: GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => {
  const colorBgBase = bgBaseColor || colorDarkBase;
  const colorTextBase = textBaseColor || colorLightBase;

  return {
    colorBgBase,
    colorTextBase,

    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    colorFill: getAlphaColor(colorTextBase, 0.18),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),

    colorBgElevated: getSolidColor(colorBgBase, 12),
    colorBgContainer: getSolidColor(colorBgBase, 8),
    colorBgLayout: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getSolidColor(colorBgBase, 26),

    colorBorder: getSolidColor(colorBgBase, 26),
    colorBorderSecondary: getSolidColor(colorBgBase, 19),

    colorBgDefault: '#0C0C0C',
    colorBgSecondary: '#1A1A1A',
    colorBgInput: '#252525',
    colorBgBorder: '#212121',
    colorBgDivider: 'rgba(33, 33, 33, 0.8)',

    colorTextLight1: colorLightBase,
    colorTextLight2: getAlphaColor(colorLightBase, 0.85),
    colorTextLight3: getAlphaColor(colorLightBase, 0.65),
    colorTextLight4: getAlphaColor(colorLightBase, 0.45),
    colorTextLight5: getAlphaColor(colorLightBase, 0.3),
    colorTextLight6: getAlphaColor(colorLightBase, 0.2),
    colorTextLight7: getAlphaColor(colorLightBase, 0.12),
    colorTextLight8: getAlphaColor(colorLightBase, 0.08),
    colorTextLight9: getAlphaColor(colorLightBase, 0.04),

    colorTextDark1: colorDarkBase,
    colorTextDark2: getAlphaColor(colorDarkBase, 0.85),
    colorTextDark3: getAlphaColor(colorDarkBase, 0.65),
    colorTextDark4: getAlphaColor(colorDarkBase, 0.45),
    colorTextDark5: getAlphaColor(colorDarkBase, 0.25),
    colorTextDark6: getAlphaColor(colorDarkBase, 0.15),
    colorTextDark7: getAlphaColor(colorDarkBase, 0.06),
    colorTextDark8: getAlphaColor(colorDarkBase, 0.04),
    colorTextDark9: getAlphaColor(colorDarkBase, 0.02),
  };
};
