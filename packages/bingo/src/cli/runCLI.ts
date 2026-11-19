import { styleText } from 'node:util';

import { describeOptions, parseRawArgs } from 'parse-standard-args';
import { z } from 'zod';

import type { AnyShape } from '../types/shapes.ts';
import type { Template } from '../types/templates.ts';
import { cliFlags } from './cliFlags.ts';
import type { ClackDisplay } from './display/createClackDisplay.ts';
import { getRerunCommand } from './loggers/getRerunCommand.ts';
import { logHelpText } from './loggers/logHelpText.ts';
import { logInvalidFlags } from './loggers/logInvalidFlags.ts';
import { logOutro } from './loggers/logOutro.ts';
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

const overridableCliFlags = new Set(['directory', 'owner', 'repository']);

export interface RunCLISettings<OptionsShape extends AnyShape = AnyShape, Refinements = unknown> {
  /**
   * Args as provided on the command line, without the node and script paths.
   */
  args: string[];
  display: ClackDisplay;
  from: string;
  rerunFrom?: string;
  template: Template<OptionsShape, Refinements>;
}

export async function runCLI<OptionsShape extends AnyShape = AnyShape, Refinements = unknown>({
  args,
  display,
  from,
  rerunFrom = from,
  template,
}: RunCLISettings<OptionsShape, Refinements>) {
  const optionFlags = describeOptions(template.options);
  const { issues, values } = parseRawArgs({
    args,
    // Template options may take over these CLI flags, but not others, such as --mode.
    flags: [
      ...cliFlags.filter(
        (flag) => !overridableCliFlags.has(flag.key) || !(flag.key in template.options),
      ),
      ...optionFlags.filter(
        (flag) =>
          overridableCliFlags.has(flag.key) || !cliFlags.some(({ key }) => key === flag.key),
      ),
    ],
    positionals: { kinds: [], rest: 'string' },
  });

  if (issues.some((issue) => issue.kind === 'unknown')) {
    logInvalidFlags(issues);
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
    display,
    from,
    providedValues: values,
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
