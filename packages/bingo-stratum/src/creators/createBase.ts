import type { AnyShape } from 'bingo';

import type { Base, BaseDefinition } from '../types/bases.ts';
import { assertNoPresetOption } from './assertNoPresetOption.ts';
import { createBlock } from './createBlock.ts';
import { createPreset } from './createPreset.ts';
import { createStratumTemplate } from './createStratumTemplate.ts';

/**
 * Creates a Stratum {@link Base}.
 * @template OptionsShape Schemas of options the Base's Blocks take in.
 * @see {@link https://www.create.bingo/engines/stratum/apis/create-base}
 */
export function createBase<OptionsShape extends AnyShape>(
  baseDefinition: BaseDefinition<OptionsShape>,
): Base<OptionsShape> {
  assertNoPresetOption(baseDefinition);

  const base: Base<OptionsShape> = {
    ...baseDefinition,
    createBlock,
    createPreset: (presetDefinition) => createPreset(base, presetDefinition),
    createStratumTemplate: (templateDefinition) => createStratumTemplate(base, templateDefinition),
  };

  return base;
}
