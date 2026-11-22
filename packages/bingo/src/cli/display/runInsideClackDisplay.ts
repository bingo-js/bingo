import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';

import { logOutro } from '../loggers/logOutro.ts';
import { cliMessages } from '../messages.ts';
import { type CliStatus, cliStatuses } from '../status.ts';
import type { ModeResults } from '../types.ts';
import { type ClackDisplay, createClackDisplay } from './createClackDisplay.ts';

export interface DisplayPackageData {
  name: string;
  version: string;
}

export const runInsideClackDisplay = async (
  { name, version }: DisplayPackageData,
  runner: (display: ClackDisplay) => Promise<CliStatus | ModeResults>,
): Promise<CliStatus> => {
  const display = createClackDisplay();

  prompts.intro(
    [
      styleText('blueBright', `✨ `),
      styleText(['bgGreenBright', 'black'], name),
      styleText('blue', `@${version}`),
      styleText('blueBright', ` ✨`),
    ].join(''),
  );

  const results = await runner(display);

  if (typeof results === 'number') {
    return results;
  }

  if (results.status === cliStatuses.error && results.error) {
    prompts.log.error(styleText('red', `Error: ${results.error.message}`));
  }

  logOutro(results.outro ?? styleText('yellow', `Operation cancelled. ${cliMessages.exiting}`), {
    items: display.dumpItems(),
    suggestions: results.suggestions,
  });

  return results.status;
};
