import { styleText } from 'node:util';

import { z } from 'zod';

import type { AnyShape } from '../types/shapes.ts';
import type { Template } from '../types/templates.ts';
import type { ClackDisplay } from './display/createClackDisplay.ts';
import { getRerunCommand } from './loggers/getRerunCommand.ts';
import { logHelpText } from './loggers/logHelpText.ts';
import { logInvalidFlags } from './loggers/logInvalidFlags.ts';
import { logOutro } from './loggers/logOutro.ts';
import { logUnknownFlags } from './loggers/logUnknownFlags.ts';
import type { RunCLIRawValues } from './parseProcessArgv.ts';
import { getTemplateOptionsError } from './parsers/getTemplateOptionsError.ts';
import { getUnknownFlags } from './parsers/getUnknownFlags.ts';
import { parseOptionsArgs } from './parsers/parseOptionsArgs.ts';
import { readProductionSettings } from './readProductionSettings.ts';
import { runModeSetup } from './setup/runModeSetup.ts';
import { cliStatuses } from './status.ts';
import { runModeTransition } from './transition/runModeTransition.ts';

const valuesSchema = z.object({
  directory: z.string().optional(),
  help: z.boolean().optional(),
  mode: z.union([z.literal('setup'), z.literal('transition')]).optional(),
  offline: z.boolean().optional(),
  owner: z.string().optional(),
  remote: z.boolean().optional(),
  repository: z.string().optional(),
  'skip-files': z.boolean().optional(),
  'skip-requests': z.boolean().optional(),
  'skip-scripts': z.boolean().optional(),
});

export interface RunCLISettings<OptionsShape extends AnyShape = AnyShape, Refinements = unknown> {
  argv: string[];
  display: ClackDisplay;
  from: string;
  rerunFrom?: string;
  template: Template<OptionsShape, Refinements>;
  values: RunCLIRawValues;
}

export async function runCLI<OptionsShape extends AnyShape = AnyShape, Refinements = unknown>({
  argv,
  display,
  from,
  rerunFrom = from,
  template,
  values,
}: RunCLISettings<OptionsShape, Refinements>) {
  const optionsError = getTemplateOptionsError(template.options);
  if (optionsError) {
    return { error: optionsError, status: cliStatuses.error };
  }

  const { issues, unknown } = parseOptionsArgs(argv, template.options);
  const unknownFlags = getUnknownFlags(unknown, template.options);
  if (unknownFlags.length) {
    logUnknownFlags(unknownFlags);
    if (issues.length) {
      logInvalidFlags(issues);
    }
    return { status: cliStatuses.error };
  }

  const validatedValues = valuesSchema.parse(values);
  const productionSettings = await readProductionSettings({
    from,
    ...validatedValues,
  });
  if (productionSettings instanceof Error) {
    logOutro(styleText('red', productionSettings.message));
    return cliStatuses.error;
  }
  if (validatedValues.help) {
    return logHelpText(productionSettings.mode, from, template);
  }

  if (issues.length) {
    logInvalidFlags(issues);
    return { status: cliStatuses.error };
  }

  const sharedSettings = {
    ...validatedValues,
    argv,
    display,
    from,
    remote: validatedValues.remote,
    rerunCommand: getRerunCommand(rerunFrom),
    skips: {
      files: validatedValues['skip-files'],
      requests: validatedValues['skip-requests'],
      scripts: validatedValues['skip-scripts'],
    },
    template,
  };

  return productionSettings.mode === 'setup'
    ? await runModeSetup(sharedSettings)
    : await runModeTransition({
        ...sharedSettings,
        configFile: productionSettings.configFile,
      });
}
