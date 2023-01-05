export const PresetBarShapeTypes = ['default', 'square', 'round'] as const;

export const PresetIconShapeTypes = ['circle', 'squircle'] as const;

export const PresetShapeTypes = [...PresetBarShapeTypes, ...PresetIconShapeTypes] as const;

export type PresetShapeType = typeof PresetShapeTypes[number];
export type PresetBarShapeType = typeof PresetBarShapeTypes[number];
export type PresetIconShapeType = typeof PresetIconShapeTypes[number];
