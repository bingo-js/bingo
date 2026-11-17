import { Creation } from '../types/creations.ts';
import { RequestedSkips } from '../types/skips.ts';
import { SystemContext } from '../types/system.ts';
import { applyFilesToSystem } from './applyFilesToSystem.ts';
import { applyRequestsToSystem } from './applyRequestsToSystem.ts';
import { applyScriptsToSystem } from './applyScriptsToSystem.ts';

export interface ApplyCreationSettings {
  offline?: boolean;
  skips?: RequestedSkips;
  system: SystemContext;
}

export async function runCreation(
  creation: Partial<Creation>,
  { offline, skips = {}, system }: ApplyCreationSettings,
) {
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
}
