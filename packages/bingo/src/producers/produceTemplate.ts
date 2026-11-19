import type { IntakeDirectory } from 'bingo-fs';
import type { BingoSystem } from 'bingo-systems';

import { createSystemContext } from '../contexts/createSystemContext.ts';
import { mergeCreations } from '../mergers/mergeCreations.ts';
import type { Creation } from '../types/creations.ts';
import type { ProductionMode } from '../types/modes.ts';
import type { AnyShape, InferredObject } from '../types/shapes.ts';
import type { Template } from '../types/templates.ts';

/**
 * Settings to run a template with {@link produceTemplate}.
 * @template OptionsShape Schemas of options the template takes in.
 * @template Refinements Any optional customizations from a template-specific config file.
 * @see {@link https://www.create.bingo/build/apis/produce-template#settings}
 */
export interface ProduceTemplateSettings<
  OptionsShape extends AnyShape,
  Refinements,
> extends Partial<BingoSystem> {
  /**
   * Existing file creations, if in transition mode.
   */
  files?: IntakeDirectory;

  /**
   * Which repository mode Bingo is being run in.
   * @see {@link https://create.bingo/build/concepts/modes}
   */
  mode?: ProductionMode;

  /**
   * Whether to run in an "offline" mode that skips network requests.
   */
  offline?: boolean;

  /**
   * Options values as described by the template's options schema.
   */
  options: InferredObject<OptionsShape>;

  /**
   * Any optional template-specific customizations.
   */
  refinements?: Refinements;
}

/**
 * Runs a Template's produce(), along with a mode-specific producer if specified.
 * @template OptionsShape Schemas of options the template takes in.
 * @template Refinements Any optional customizations from a template-specific config file.
 * @see {@link http://create.bingo/build/apis/produce-template}
 */
export async function produceTemplate<OptionsShape extends AnyShape, Refinements>(
  template: Template<OptionsShape, Refinements>,
  settings: ProduceTemplateSettings<OptionsShape, Refinements>,
): Promise<Partial<Creation>> {
  const system = createSystemContext({
    directory: '.',
    ...settings,
  });

  const context = { ...settings, ...system };
  let creation = await template.produce(context);

  const augmenter = settings.mode && template[settings.mode];
  if (augmenter) {
    creation = mergeCreations(creation, await augmenter(context));
  }

  return creation;
}
