import type { PresetColorType, SeedToken } from '../internal';

export const defaultPresetColors: PresetColorType = {
  gray: '#fff',
  blue: '#008dff',
  purple: '#8200ec',
  cyan: '#59ffca',
  green: '#35c44a',
  magenta: '#ff268e',
  pink: '#ff268e',
  red: '#e11a1a',
  orange: '#ff8200',
  yellow: '#ffe800',
  volcano: '#fe5720',
  geekblue: '#004BFF',
  gold: '#ffc049',
  lime: '#9ee542',
};

export const themePresetColors = {
  colorPrimary: '#004BFF',
  colorSecondary: '#59ffca',
  colorSuccess: '#59ffca',
  colorWarning: '#ffe800',
  colorError: '#e11a1a',
  colorInfo: '#008dff',
};

export const colorDarkBase = '#000';
export const colorLightBase = '#fff';

const seedToken: SeedToken = {
  // preset color palettes
  ...defaultPresetColors,

  // Color
  ...themePresetColors,
  colorTextBase: '',

  colorBgBase: colorDarkBase,

  // Font
  fontFamily: `'Plus Jakarta Sans',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  monoSpaceFontFamily: `monospace`,
  bodyFontWeight: '500',
  headingFontWeight: '600',
  fontSize: 14,

  // Line
  lineWidth: 1,
  lineType: 'solid',

  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
  motionEaseInQuint: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',

  // Radius
  borderRadius: 6,

  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,

  // Control Base
  controlHeight: 32,

  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1000,

  // Image
  opacityImage: 1,

  // Wireframe
  wireframe: false,
};
export default seedToken;
