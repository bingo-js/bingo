import { styleText } from 'node:util';

import { z } from 'zod';

import type { AnyShape } from '../types/shapes.ts';
import type { Template } from '../types/templates.ts';
import type { ClackDisplay } from './display/createClackDisplay.ts';
import { getRerunCommand } from './loggers/getRerunCommand.ts';
import { logHelpText } from './loggers/logHelpText.ts';
import { logOutro } from './loggers/logOutro.ts';
import { logUnknownFlags } from './loggers/logUnknownFlags.ts';
import type { RunCliRawValues } from './parseProcessArgv.ts';
import { getUnknownFlags } from './parsers/getUnknownFlags.ts';
import { readProductionSettings } from './readProductionSettings.ts';
import { runModeSetup } from './setup/runModeSetup.ts';
import { cliStatuses } from './status.ts';
import { runModeTransition } from './transition/runModeTransition.ts';
import type { ModeResults } from './types.ts';

const valuesSchema = z.object({
  directory: z.string().optional(),
  help: z.boolean().optional(),
  mode: z.union([z.literal('setup'), z.literal('transition')]).optional(),
  offline: z.boolean().optional(),
  owner: z.string().optional(),
  remote: z.boolean().optional(),
  'repo-visibility': z.enum(['public', 'private']).optional(),
  repository: z.string().optional(),
  'skip-files': z.boolean().optional(),
  'skip-requests': z.boolean().optional(),
  'skip-scripts': z.boolean().optional(),
});

export interface RunCliSettings<OptionsShape extends AnyShape = AnyShape, Refinements = unknown> {
  argv: string[];
  display: ClackDisplay;
  from: string;
  rerunFrom?: string;
  template: Template<OptionsShape, Refinements>;
  values: RunCliRawValues;
}

export async function runCli<OptionsShape extends AnyShape = AnyShape, Refinements = unknown>({
  argv,
  display,
  from,
  rerunFrom = from,
  template,
  values,
}: RunCliSettings<OptionsShape, Refinements>): Promise<typeof cliStatuses.error | ModeResults> {
  const unknownFlags = getUnknownFlags(values, template.options);
  if (unknownFlags.length) {
    logUnknownFlags(unknownFlags);
    return { status: cliStatuses.error };
  }

  const validatedValues = valuesSchema.parse(values);
  if (validatedValues['repo-visibility'] && !validatedValues.remote) {
    logOutro(styleText('red', '--repo-visibility can only be used alongside --remote.'));
    return cliStatuses.error;
  }

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

  const { 'repo-visibility': repoVisibility, ...settingsValues } = validatedValues;
  const sharedSettings = {
    ...settingsValues,
    repoVisibility: repoVisibility ?? 'public',
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
