import type { AnyShape, InferredObject } from 'bingo';

import type { Base } from '../types/bases.ts';
import type { Preset, PresetDefinition } from '../types/presets.ts';
import { assertNoDuplicateBlocks } from './assertNoDuplicateBlocks.ts';

export function createPreset<OptionsShape extends AnyShape>(
  base: Base<OptionsShape>,
  presetDefinition: PresetDefinition<InferredObject<OptionsShape>>,
): Preset<OptionsShape> {
  assertNoDuplicateBlocks(presetDefinition);

  return {
    ...presetDefinition,
    base,
  };
}
