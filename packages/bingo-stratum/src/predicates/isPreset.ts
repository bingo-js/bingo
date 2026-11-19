import type { Preset } from '../types/presets.ts';
import { isBase } from './isBase.ts';
import { isPresetAbout } from './isPresetAbout.ts';

export function isPreset(value: unknown): value is Preset {
  return (
    !!value &&
    typeof value === 'object' &&
    'about' in value &&
    isPresetAbout(value.about) &&
    'base' in value &&
    isBase(value.base) &&
    'blocks' in value &&
    Array.isArray(value.blocks)
  );
}
