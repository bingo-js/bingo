import type { SystemRunner } from 'bingo-systems';
import type { RepositoryLocator } from 'new-github-repository';

import { clearLocalGitTags } from './clearLocalGitTags.ts';
import { createInitialCommit } from './createInitialCommit.ts';
import { createTrackingBranches } from './createTrackingBranches.ts';

export async function prepareGitRepository(
  locator: RepositoryLocator | undefined,
  runner: SystemRunner,
) {
  await createTrackingBranches(locator, runner);
  await createInitialCommit(runner, { push: !!locator });
  await clearLocalGitTags(runner);
}
