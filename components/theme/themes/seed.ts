import type { PresetColorType, SeedToken } from '../internal';

export const defaultPresetColors: PresetColorType = {
  gray: '#fff',
  blue: '#0078D9',
  purple: '#6F00C9',
  cyan: '#4CEAAC',
  green: '#2DA73F',
  magenta: '#D92079',
  pink: '#D92079',
  red: '#BF1616',
  orange: '#D96F00',
  yellow: '#D9C500',
  volcano: '#D84A1B',
  geekblue: '#004BFF',
  gold: '#D9A33E',
  lime: '#86C338',
};

const seedToken: SeedToken = {
  // preset color palettes
  ...defaultPresetColors,

  // Color
  colorPrimary: '#004BFF',
  colorSecondary: '#7CD383',
  colorSuccess: '#7CD383',
  colorWarning: '#D9C500',
  colorError: '#BF1616',
  colorInfo: '#0078D9',
  colorTextBase: '',

  colorBgBase: '',

  // Font
  fontFamily: `'Plus Jakarta Sans',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  monoSpaceFontFamily: `monospace`,
  bodyFontWeight: '400',
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
