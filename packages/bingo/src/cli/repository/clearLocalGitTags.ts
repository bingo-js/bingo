import type { SystemRunner } from 'bingo-systems';

export const clearLocalGitTags = async (runner: SystemRunner): Promise<void> => {
  const tags = await runner('git tag -l');

  if (tags.stdout) {
    await runner(`git tag -d ${tags.stdout.toString().replaceAll('\n', ' ')}`);
  }
};
