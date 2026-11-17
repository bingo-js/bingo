import { PresetAbout } from '../types/presets.ts';

export function isPresetAbout(value: unknown): value is PresetAbout {
  return !!value && typeof value === 'object' && 'name' in value;
}
