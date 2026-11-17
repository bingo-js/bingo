import fs from 'node:fs/promises';

import { IntakeDirectory } from 'bingo-fs';
import { BingoSystem } from 'bingo-systems';

import { createSystemContextWithAuth } from '../contexts/createSystemContextWithAuth.ts';
import { produceTemplate } from '../producers/produceTemplate.ts';
import { Creation } from '../types/creations.ts';
import { ProductionMode } from '../types/modes.ts';
import { AnyShape, InferredObject } from '../types/shapes.ts';
import { RequestedSkips } from '../types/skips.ts';
import { Template } from '../types/templates.ts';
import { runCreation } from './runCreation.ts';

/**
 * Settings to run a template with {@link runTemplate}.
 * @template OptionsShape Schemas of options the template takes in.
 * @template Refinements Any optional customizations from a template-specific config file.
 * @see {@link https://www.create.bingo/build/apis/run-template#settings}
 */
export interface RunTemplateSettings<
  OptionsShape extends AnyShape,
  Refinements,
> extends Partial<BingoSystem> {
  /**
   * Current working directory ("cwd") path to use for the file system and running scripts.
   */
  directory?: string;

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
   * Any optional customizations from a template-specific config file.
   */
  refinements?: Refinements;

  /**
   * Settings to opt out of applying specific parts of the template.
   */
  skips?: RequestedSkips;
}

/**
 * Generates and applies Creation output for a template.
 * @template OptionsShape Schemas of options the template takes in.
 * @template Refinements Any optional customizations from a template-specific config file.
 * @see {@link https://www.create.bingo/build/apis/run-template}
 */
export async function runTemplate<OptionsShape extends AnyShape, Refinements>(
  template: Template<OptionsShape, Refinements>,
  settings: RunTemplateSettings<OptionsShape, Refinements>,
): Promise<Partial<Creation>> {
  const { directory = '.', offline, skips = {} } = settings;

  if (!skips.files) {
    await fs.mkdir(directory, { recursive: true });
  }

  const system = await createSystemContextWithAuth({
    directory,
    ...settings,
  });

  const creation = await produceTemplate(template, { ...system, ...settings });

  await runCreation(creation, { offline, skips, system });

  return creation;
}
