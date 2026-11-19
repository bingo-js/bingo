import * as fs from 'node:fs/promises';
import path from 'node:path';

import type { ProductionMode } from '../types/modes.ts';
import { tryCatchSafe } from '../utils/tryCatch.ts';
import type { ProductionSettings } from './types.ts';

export interface ReadProductionSettingsOptions {
  directory?: string;
  from?: string;
  mode?: ProductionMode;
}

export async function readProductionSettings({
  directory = '.',
  from,
  mode,
}: ReadProductionSettingsOptions = {}): Promise<Error | ProductionSettings> {
  const items = await tryCatchSafe(fs.readdir(directory));
  let defaultMode: ProductionMode = mode ?? 'setup';

  if (!items) {
    return defaultMode === 'transition'
      ? new Error('Cannot run with --mode transition on a directory that does not yet exist.')
      : { mode: defaultMode };
  }

  const configFilePrefix = from && `${from.replace(/^@/, '').replaceAll('/', '-')}.config.`;

  for (const item of items) {
    if (configFilePrefix && item.startsWith(configFilePrefix)) {
      return {
        configFile: path.join(directory, item),
        mode: 'transition',
      };
    }

    if (item === '.git' && mode !== 'setup') {
      defaultMode = 'transition';
    }
  }

  return {
    mode: defaultMode,
  };
}
