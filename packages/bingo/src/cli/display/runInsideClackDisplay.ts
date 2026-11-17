import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';

import { logOutro } from '../loggers/logOutro.ts';
import { CLIMessage } from '../messages.ts';
import { CLIStatus } from '../status.ts';
import { ModeResults } from '../types.ts';
import { ClackDisplay, createClackDisplay } from './createClackDisplay.ts';

export interface DisplayPackageData {
  name: string;
  version: string;
}

export async function runInsideClackDisplay(
  { name, version }: DisplayPackageData,
  runner: (display: ClackDisplay) => Promise<CLIStatus | ModeResults>,
) {
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

  if (results.status === CLIStatus.Error && results.error) {
    prompts.log.error(styleText('red', `Error: ${results.error.message}`));
  }

  logOutro(results.outro ?? styleText('yellow', `Operation cancelled. ${CLIMessage.Exiting}`), {
    items: display.dumpItems(),
    suggestions: results.suggestions,
  });

  return results.status;
}
