import { execa, parseCommandString } from 'execa';

import { getColorsEnv } from './getColorsEnv.ts';
import type { SystemRunner } from './runner.ts';

export function createSystemRunner(directory = '.'): SystemRunner {
  const executor = execa({
    cwd: directory,
    env: getColorsEnv(),
    reject: false,
  });

  return (command: string) => executor`${parseCommandString(command)}`;
}
