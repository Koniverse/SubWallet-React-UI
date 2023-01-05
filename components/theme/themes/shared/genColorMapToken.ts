import { TinyColor } from '@ctrl/tinycolor';
import type { ColorMapToken, SeedToken } from '../../interface';
import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap';

interface PaletteGenerators {
  generateColorPalettes: GenerateColorMap;
  generateNeutralColorPalettes: GenerateNeutralColorMap;
}

export default function genColorMapToken(
  seed: SeedToken,
  { generateColorPalettes, generateNeutralColorPalettes }: PaletteGenerators,
): ColorMapToken {
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorSecondary: colorSecondaryBase,
    colorBgBase,
    colorTextBase,
  } = seed;

  const primaryColors = generateColorPalettes(colorPrimaryBase);
  primaryColors[6] = colorPrimaryBase;
  const secondaryColors = generateColorPalettes(colorSecondaryBase);
  const successColors = generateColorPalettes(colorSuccessBase);
  const warningColors = generateColorPalettes(colorWarningBase);
  const errorColors = generateColorPalettes(colorErrorBase);
  const infoColors = generateColorPalettes(colorInfoBase);
  const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase);

  return {
    ...neutralColors,

    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],

    colorSecondaryBg: secondaryColors[1],
    colorSecondaryBgHover: secondaryColors[2],
    colorSecondaryBorder: secondaryColors[3],
    colorSecondaryBorderHover: secondaryColors[4],
    colorSecondaryHover: secondaryColors[5],
    colorSecondary: secondaryColors[6],
    colorSecondaryActive: secondaryColors[7],
    colorSecondaryTextHover: secondaryColors[8],
    colorSecondaryText: secondaryColors[9],
    colorSecondaryTextActive: secondaryColors[10],

    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[4],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[8],
    colorSuccessText: successColors[9],
    colorSuccessTextActive: successColors[10],

    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[8],
    colorErrorText: errorColors[9],
    colorErrorTextActive: errorColors[10],

    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[4],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],

    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],

    colorBgMask: new TinyColor(neutralColors.colorBgBase).setAlpha(0.55).toRgbString(),
    colorWhite: '#fff',
  };
}
