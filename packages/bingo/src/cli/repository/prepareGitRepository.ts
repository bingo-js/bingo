import type { SystemRunner } from 'bingo-systems';
import type { RepositoryLocator } from 'new-github-repository';

import { clearLocalGitTags } from './clearLocalGitTags.ts';
import { createInitialCommit } from './createInitialCommit.ts';
import { createTrackingBranches } from './createTrackingBranches.ts';

export const prepareGitRepository = async (
  locator: RepositoryLocator | undefined,
  runner: SystemRunner,
): Promise<void> => {
  await createTrackingBranches(locator, runner);
  await createInitialCommit(runner, { push: !!locator });
  await clearLocalGitTags(runner);
};
