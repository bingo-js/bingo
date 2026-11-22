import type { SystemRunner } from 'bingo-systems';

export interface CreateInitialCommitSettings {
  amend?: boolean;
  push: boolean;
}

export const createInitialCommit = async (
  runner: SystemRunner,
  { amend, push }: CreateInitialCommitSettings,
): Promise<void> => {
  for (const command of [
    `git add -A`,
    `git commit --message feat:\\ initialized\\ repo\\ ✨ ${amend ? '--amend ' : ''}--no-gpg-sign`,
    ...(push ? [`git push -u origin main --force`] : []),
  ]) {
    await runner(command);
  }
};
