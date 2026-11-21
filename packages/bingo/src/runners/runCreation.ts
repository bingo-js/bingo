import type { Creation } from '../types/creations.ts';
import type { RequestedSkips } from '../types/skips.ts';
import type { SystemContext } from '../types/system.ts';
import { applyFilesToSystem } from './applyFilesToSystem.ts';
import { applyRequestsToSystem } from './applyRequestsToSystem.ts';
import { applyScriptsToSystem } from './applyScriptsToSystem.ts';

export interface ApplyCreationSettings {
  offline?: boolean;
  skips?: RequestedSkips;
  system: SystemContext;
}

export const runCreation = async (
  creation: Partial<Creation>,
  { offline, skips = {}, system }: ApplyCreationSettings,
): Promise<void> => {
  if (creation.files && !skips.files) {
    await applyFilesToSystem(creation.files, system.fs, system.directory);
  }

  await Promise.all([
    creation.scripts && !skips.scripts && applyScriptsToSystem(creation.scripts, system),
    !offline &&
      creation.requests &&
      !skips.requests &&
      applyRequestsToSystem(creation.requests, system),
  ]);
};
