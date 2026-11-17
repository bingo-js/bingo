import type { Base } from '../types/bases.ts';

export function isBase(value: unknown): value is Base {
  return (
    !!value &&
    typeof value === 'object' &&
    'createBlock' in value &&
    typeof value.createBlock === 'function' &&
    'createPreset' in value &&
    typeof value.createPreset === 'function' &&
    'options' in value
  );
}
