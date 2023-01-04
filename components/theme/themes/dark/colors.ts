import { generate } from '@ant-design/colors';
import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generate(baseColor, { theme: 'dark' });
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

const colorLight = '#FFF';
const colorDark = '#000';

export const generateNeutralColorPalettes: GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => {
  const colorBgBase = bgBaseColor || colorDark;
  const colorTextBase = textBaseColor || colorLight;

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

    colorBgDefault: colorBgBase,
    colorBgSecondary: '#1A1A1A',
    colorBgInput: '#252525',
    colorBgBorder: '#212121',
    colorBgDivider: 'rgba(33, 33, 33, 0.8)',

    colorTextLight1: colorLight,
    colorTextLight2: getAlphaColor(colorLight, 0.85),
    colorTextLight3: getAlphaColor(colorLight, 0.65),
    colorTextLight4: getAlphaColor(colorLight, 0.45),
    colorTextLight5: getAlphaColor(colorLight, 0.3),
    colorTextLight6: getAlphaColor(colorLight, 0.2),
    colorTextLight7: getAlphaColor(colorLight, 0.12),
    colorTextLight8: getAlphaColor(colorLight, 0.08),
    colorTextLight9: getAlphaColor(colorLight, 0.04),

    colorTextDark1: colorDark,
    colorTextDark2: getAlphaColor(colorDark, 0.85),
    colorTextDark3: getAlphaColor(colorDark, 0.65),
    colorTextDark4: getAlphaColor(colorDark, 0.45),
    colorTextDark5: getAlphaColor(colorDark, 0.25),
    colorTextDark6: getAlphaColor(colorDark, 0.15),
    colorTextDark7: getAlphaColor(colorDark, 0.06),
    colorTextDark8: getAlphaColor(colorDark, 0.04),
    colorTextDark9: getAlphaColor(colorDark, 0.02),
  };
};
