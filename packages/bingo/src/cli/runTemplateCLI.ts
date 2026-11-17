import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';

import { packageData } from '../packageData.ts';
import type { AnyShape } from '../types/shapes.ts';
import type { Template } from '../types/templates.ts';
import { type DisplayPackageData, runInsideClackDisplay } from './display/runInsideClackDisplay.ts';
import { getTemplatePackageData } from './getTemplatePackageData.ts';
import { parseProcessArgv } from './parseProcessArgv.ts';
import { runCLI } from './runCLI.ts';
import { cliStatuses } from './status.ts';

/**
 * Runs an interactive CLI to generate and apply a template's output.
 * @see {@link https://create.bingo/build/apis/run-template-cli}
 */
export async function runTemplateCLI<
  OptionsShape extends AnyShape = AnyShape,
  Refinements = unknown,
>(template: Template<OptionsShape, Refinements>, providedTemplatePackageData?: DisplayPackageData) {
  const templatePackageData = providedTemplatePackageData ?? (await getTemplatePackageData());

  if (templatePackageData instanceof Error) {
    console.error(templatePackageData);
    return cliStatuses.error;
  }

  const { argv, values } = parseProcessArgv();
  if (values.version) {
    console.log(`${packageData.name}@${packageData.version}`);
    console.log(`${templatePackageData.name}@${templatePackageData.version}`);
    return cliStatuses.success;
  }

  return await runInsideClackDisplay(templatePackageData, async (display) => {
    if (template.about?.repository) {
      prompts.log.info(
        `Learn more on:\n  ${styleText('blue', `https://github.com/${template.about.repository.owner}/${template.about.repository.repository}`)}`,
      );
    }

    return await runCLI({
      argv,
      display,
      from: templatePackageData.name,
      template,
      values,
    });
  });
}
