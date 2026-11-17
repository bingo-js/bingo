import { AnyShape, InferredObject, ProductionMode } from 'bingo';
import { IntakeDirectory } from 'bingo-fs';

import { StratumRefinements } from '../types/refinements.ts';
import { StratumTemplate } from '../types/templates.ts';
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

export function produceStratumTemplate<OptionsShape extends AnyShape = AnyShape>(
  template: StratumTemplate<OptionsShape>,
  { files, mode, offline, options, refinements = {} }: ProduceStratumTemplateSettings<OptionsShape>,
) {
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
}
