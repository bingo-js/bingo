import type { AnyShape, InferredObject, ProductionMode } from 'bingo';
import type { IntakeDirectory } from 'bingo-fs';

import type { BlockCreation } from '../types/creations.ts';
import type { StratumRefinements } from '../types/refinements.ts';
import type { StratumTemplate } from '../types/templates.ts';
import { getPresetByName } from '../utils/getPresetByName.ts';
import { applyBlockRefinements } from './applyBlockRefinements.ts';
import { produceBlocks } from './produceBlocks.ts';

export interface ProduceStratumTemplateSettings<OptionsShape extends AnyShape> {
  /**
   * Existing file creations to be used for Blocks that can intake Props.
   */
  files?: IntakeDirectory;
  mode?: ProductionMode;
  offline?: boolean;
  options: InferredObject<OptionsShape> & { preset: string };
  refinements?: StratumRefinements<InferredObject<OptionsShape>>;
}

export const produceStratumTemplate = <OptionsShape extends AnyShape = AnyShape>(
  template: StratumTemplate<OptionsShape>,
  { files, mode, offline, options, refinements = {} }: ProduceStratumTemplateSettings<OptionsShape>,
): Partial<BlockCreation<InferredObject<OptionsShape> & { preset: string }>> => {
  const preset = getPresetByName(template.presets, options.preset);
  if (preset instanceof Error) {
    throw preset;
  }

  const blocks = applyBlockRefinements(template.blocks, preset.blocks, options, refinements.blocks);

  return produceBlocks(blocks, {
    blockExtensions: refinements.extensions,
    files,
    mode,
    offline,
    options,
  });
};
