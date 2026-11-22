import path from 'node:path';

import * as prompts from '@clack/prompts';

import { packageData } from '../packageData.ts';
import { runInsideClackDisplay } from './display/runInsideClackDisplay.ts';
import { tryImportTemplate } from './importers/tryImportTemplate.ts';
import { logHelpOptions } from './loggers/logHelpOptions.ts';
import { parseProcessArgv } from './parseProcessArgv.ts';
import { runCli } from './runCli.ts';
import { type CliStatus, cliStatuses } from './status.ts';
import { makeRelative, quoteIfSpaced } from './utils.ts';

/**
 * Runs the full Bingo CLI, including reading process arguments.
 * @returns CLI status to assign to `process.exitCode`.
 */
export const runBingoCli = async (): Promise<CliStatus> => {
  const { argv, positionals, values } = parseProcessArgv();
  if (values.version) {
    console.log(packageData.version);
    return cliStatuses.success;
  }

  return await runInsideClackDisplay(packageData, async (display) => {
    const from = positionals.find((positional) => !positional.startsWith('-'));
    if (!from) {
      prompts.log.error('bingo requires a path to local template file.');
      return cliStatuses.error;
    }

    const template = await tryImportTemplate(makeRelative(from));
    if (template instanceof Error) {
      console.error(template);
      return cliStatuses.error;
    }

    const result = await runCli({
      argv,
      display,
      from: 'bingo',
      rerunFrom: `bingo ${quoteIfSpaced(path.resolve(from))}`,
      template,
      values,
    });

    if (values.help) {
      logHelpOptions('Bingo Development', 'bingo', [
        {
          examples: ['template.js', './path/to/template/index.js'],
          flag: '<from>',
          text: 'Local file to run as a template',
          type: 'string',
        },
      ]);
    }

    return result;
  });
};
