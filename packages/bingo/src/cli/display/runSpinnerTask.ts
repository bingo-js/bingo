import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';

import { tryCatchError } from '../../utils/tryCatch.ts';
import type { ClackDisplay } from './createClackDisplay.ts';

export const runSpinnerTask = async <T>(
  display: ClackDisplay,
  start: string,
  stop: string,
  task: () => Promise<T>,
): Promise<T | Error> => {
  display.spinner.start(`${start}...`);

  const result = await tryCatchError(task());

  if (result instanceof Error) {
    display.spinner.cancel(`Error ${start[0].toLowerCase()}${start.slice(1)}:`);
    prompts.log.error(styleText('red', result.stack ?? result.message));
  } else {
    display.spinner.stop(stop);
  }

  return result;
};
