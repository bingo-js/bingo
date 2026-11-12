import path from 'node:path';
import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';

import { tryCatchError } from '../../utils/tryCatch.js';

export async function tryImport(
  from: string,
  importModule: (specifier: string) => Promise<object> = (specifier) =>
    import(specifier) as Promise<object>,
): Promise<Error | object> {
  const spinner = prompts.spinner();

  spinner.start(`Importing ${styleText('blue', from)}`);
  const imported = await tryCatchError(importModule(path.join(process.cwd(), from)));

  if (imported instanceof Error) {
    spinner.cancel(`Could not import ${styleText('blue', from)}. Does it exist?`);
  } else {
    spinner.stop(`Imported ${styleText('blue', from)}.`);
  }

  return imported;
}
