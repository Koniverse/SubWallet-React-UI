import { generate } from '@ant-design/colors';
import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { ThemePresetColorType } from 'antd/es/theme/interface/presetColors';
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../interface';
import { defaultPresetColors, themePresetColors } from '../seed';
import genColorMapToken from '../shared/genColorMapToken';
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';
import defaultAlgorithm from '../default';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const themeColorPalettes = Object.keys(themePresetColors)
    .map((colorKey: keyof ThemePresetColorType) => {
      const colors = generate(token[colorKey], {
        theme: 'dark',
        backgroundColor: token.colorBgBase,
      });

      if (colorKey === 'colorPrimary') {
        colors[5] = token[colorKey];
      }

      const colorList = new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes;

      return colorList;
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
      const colors = generate(token[colorKey], {
        theme: 'dark',
        backgroundColor: token.colorBgBase,
      });

      if (colorKey === 'geekblue') {
        colors[5] = token[colorKey];
      }

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

  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,

    // Dark tokens
    ...themeColorPalettes,
    ...colorPalettes,
    // Colors
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
  };
};

export default derivative;
