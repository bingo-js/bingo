import { styleText } from 'node:util';

import { describeOptions, parseRawArgs } from 'parse-standard-args';

import type { ProductionMode } from '../types/modes.ts';
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
  const overrides = describeOptions(template.options).filter((flag) =>
    overridableCliFlags.has(flag.key),
  );
  const cliKeys = new Set(cliFlags.map((flag) => flag.key));
  const { issues, values } = parseRawArgs({
    args,
    flags: [
      ...cliFlags.filter((flag) => !overrides.some(({ key }) => key === flag.key)),
      ...overrides,
      ...describeOptions(template.options).filter((flag) => !cliKeys.has(flag.key)),
    ],
    positionals: { kinds: [], rest: 'string' },
  });

  if (issues.some((issue) => issue.kind === 'unknown')) {
    logInvalidFlags(issues);
    return { status: cliStatuses.error };
  }

  const cliValues = {
    directory: getString(values.directory),
    help: getBoolean(values.help),
    mode: getMode(values.mode),
    offline: getBoolean(values.offline),
    owner: getString(values.owner),
    remote: getBoolean(values.remote),
    repository: getString(values.repository),
  };
  const productionSettings = await readProductionSettings({
    from,
    directory: cliValues.directory,
    mode: cliValues.mode,
  });
  if (productionSettings instanceof Error) {
    logOutro(styleText('red', productionSettings.message));
    return cliStatuses.error;
  }
  if (cliValues.help) {
    return logHelpText(productionSettings.mode, from, template);
  }

  if (issues.length) {
    logInvalidFlags(issues);
    return { status: cliStatuses.error };
  }

  const sharedSettings = {
    directory: cliValues.directory,
    display,
    from,
    offline: cliValues.offline,
    providedValues: values,
    remote: cliValues.remote,
    repository: cliValues.repository,
    rerunCommand: getRerunCommand(rerunFrom),
    skips: {
      files: getBoolean(values['skip-files']),
      requests: getBoolean(values['skip-requests']),
      scripts: getBoolean(values['skip-scripts']),
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

function getString(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}

function getBoolean(value: unknown) {
  return typeof value === 'boolean' ? value : undefined;
}

function getMode(value: unknown): ProductionMode | undefined {
  return value === 'setup' || value === 'transition' ? value : undefined;
}
