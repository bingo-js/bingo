import { styleText } from 'node:util';

import * as prompts from '@clack/prompts';

import type { ProductionMode } from '../../types/modes.ts';

export const logStartText = (mode: ProductionMode, offline: boolean | undefined): void => {
  prompts.log.step(`Running with mode --${mode}`);

  if (offline) {
    prompts.log.message(
      `${styleText('blue', '--offline')} enabled. You'll need to git push any changes manually.`,
    );
  }
};
