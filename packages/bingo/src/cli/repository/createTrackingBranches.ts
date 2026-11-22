import type { SystemRunner } from 'bingo-systems';
import type { RepositoryLocator } from 'new-github-repository';

export const createTrackingBranches = async (
  remote: RepositoryLocator | undefined,
  runner: SystemRunner,
): Promise<void> => {
  await runner('git init');

  if (remote) {
    await runner(`git remote add origin https://github.com/${remote.owner}/${remote.repository}`);
  }
};
