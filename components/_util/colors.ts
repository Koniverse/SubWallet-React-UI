export const PresetBrandColorTypes = ['primary', 'secondary'] as const;
export const PresetStatusColorTypes = [
  'success',
  'processing',
  'error',
  'default',
  'warning',
  'danger',
] as const;

export const PresetColorTypes = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
] as const;

export type PresetBrandColorType = typeof PresetBrandColorTypes[number];

export type PresetColorType = typeof PresetColorTypes[number];

export type PresetStatusColorType = typeof PresetStatusColorTypes[number];
