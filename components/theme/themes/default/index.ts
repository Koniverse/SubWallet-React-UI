import { generate } from '@ant-design/colors';
import type { ThemePresetColorType } from 'antd/es/theme/interface/presetColors';
import genControlHeight from '../shared/genControlHeight';
import genSizeMapToken from '../shared/genSizeMapToken';
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../interface';
import { defaultPresetColors, themePresetColors } from '../seed';
import genColorMapToken from '../shared/genColorMapToken';
import genCommonMapToken from '../shared/genCommonMapToken';
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';
import genFontMapToken from '../shared/genFontMapToken';

export default function derivative(token: SeedToken): MapToken {
  const themeColorPalettes = Object.keys(themePresetColors)
    .map((colorKey: keyof ThemePresetColorType) => {
      const colors = generate(token[colorKey]);

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes;
    })
    .reduce((prev, cur) => {
      prev = {
        ...prev,
        ...cur,
      };
      return prev;
    }, {} as ColorPalettes);

  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey: keyof PresetColorType) => {
      const colors = generate(token[colorKey]);

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes;
    })
    .reduce((prev, cur) => {
      prev = {
        ...prev,
        ...cur,
      };
      return prev;
    }, {} as ColorPalettes);

  return {
    ...token,
    ...themeColorPalettes,
    ...colorPalettes,
    // Colors
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
    // Font
    ...genFontMapToken(token.fontSize),
    // Size
    ...genSizeMapToken(token),
    // Height
    ...genControlHeight(token),
    // Others
    ...genCommonMapToken(token),
  };
}
