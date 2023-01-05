export const ThemePresetColors = [
  'colorPrimary',
  'colorSecondary',
  'colorSuccess',
  'colorWarning',
  'colorError',
  'colorInfo',
] as const;
export const PresetColors = [
  'gray',
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

type ThemePresetColorKey = typeof ThemePresetColors[number];
type PresetColorKey = typeof PresetColors[number];

export type ThemePresetColorType = Record<ThemePresetColorKey, string>;
export type PresetColorType = Record<PresetColorKey, string>;

type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ColorPalettes = {
  [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string;
};
